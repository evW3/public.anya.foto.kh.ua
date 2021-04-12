import axios, { post, put } from 'axios'
import { API_URL } from "../constants";

export default {
    state: {
        dateInfo: {
            month: null,
            days: [],
            year: null,
            isLoading: true,
            tightDate: {
                previous: [],
                next: []
            }
        }
    },
    getters: { dateInfo: s => s.dateInfo },
    mutations: {
        setInfo(state, data) {
            state.dateInfo.month = data.month;
            state.dateInfo.days = [...data.days];
            state.dateInfo.year = data.year;
        },
        setIsLoading(state, val) {
            state.dateInfo.isLoading = val;
        },
        clean(state) {
            state.dateInfo.month = null;
            state.dateInfo.year = null;
            state.dateInfo.days = [];
            state.dateInfo.tightDate.previous = [];
            state.dateInfo.tightDate.next = [];
        }
    },
    actions: {
        async initDatepicker({ commit, dispatch }) {
            try {
                await commit('clean');
                const dataFromServer = { ...(await post(`${ API_URL }datepicker/`)).data };
                await dispatch('currentDays', dataFromServer);
                await dispatch('tightDateAlgorithm');
                setTimeout(async () => {
                    await commit('setIsLoading', false);
                }, 500);
            } catch (e) {
                console.log(`[ERROR] in method initDatepicker:\n${ e }`);
                await commit('setIsLoading', false);
            }
        },
        async setBusy({commit, dispatch}, day) {
            try {
                await commit('setIsLoading', true);
                let state = this.getters.dateInfo;
                const token = localStorage.getItem('token');
                if(token) {
                    await put(`${ API_URL }datepicker/`,
                        { month: state.month, day, year: state.year },
                        { headers: { Authorization: `Bearer ${ token }` }, },
                    );
                    state.days.map(item => item.day === day? item.isBusy = true : item);
                }
                setTimeout(async () => {
                    await commit('setIsLoading', false);
                }, 500);
            } catch (e) {
                console.log(`[ERROR] in method setBusy:\n${ e }`);
                await commit('setIsLoading', false);
            }
        },
        async unsetBusy({ commit, dispatch }, day) {
            try {
                await commit('setIsLoading', true);
                let state = this.getters.dateInfo;
                const token = localStorage.getItem('token');
                if(token) {
                    await axios.delete(`${ API_URL }datepicker/`, {
                        headers: { Authorization: `Bearer ${ token }` },
                        data: {
                            day,
                            month: state.month,
                            year: state.year,
                        }
                    });
                    state.days.map(item => item.day === day ? item.isBusy = false : item);
                }
                setTimeout(async () => {
                    await commit('setIsLoading', false);
                }, 500);
            } catch (e) {
                console.log(`[ERROR] in method unsetBusy:\n${ e }`);
                await commit('setIsLoading', false);
            }
        },
        async changeDate({ commit, dispatch }, options) {
            try {
                await commit('setIsLoading', true);
                const current = this.getters.dateInfo;
                const dataFromServer = (await post(`${ API_URL }datepicker/`, { month: current.month, year: current.year, ...options })).data;
                await commit('clean');
                await dispatch('currentDays', dataFromServer);
                await dispatch('tightDateAlgorithm');
                setTimeout(async () => {
                    await commit('setIsLoading', false);
                }, 500);
            } catch (e) {
                console.log(`[ERROR] in method changeDate:\n${ e }`);
                await commit('setIsLoading', false);
            }

        },
        tightDateAlgorithm() {
            let state = this.getters.dateInfo;
            let current_days = new Date(state.year, state.month - 1).getDay() || 7;
            if(current_days > 1) {
                const previous_date_days = new Date(state.year, state.month - 1, 0).getDate();
                let i = 1;
                while(current_days - i !== 0) {
                    state.tightDate.previous.push(((previous_date_days - current_days + 1) + i));
                    ++i;
                }
            }
            current_days = new Date(state.year, state.month, 0).getDay() || 7;
            if((7 - current_days) !== 0) {
                let i = 0;
                while((7 - current_days) - i !== 0) {
                    ++i;
                    state.tightDate.next.push(i);
                }
            }
            //console.log(state.tightDate); //for test
        },
        async currentDays({ commit }, dataFromServer) {
            try {
                const date = new Date(dataFromServer.year, dataFromServer.month, 0).getDate();
                let days = [];
                let i = 1;
                while(i <= date) {
                    days.push({ day: i, isBusy: dataFromServer.days.findIndex(item => item.day === i) !== -1 });
                    ++i;
                }
                await commit('setInfo', {
                    month: dataFromServer.month,
                    days,
                    year: dataFromServer.year,
                })
            } catch (e) {

            }
        },
    }
};