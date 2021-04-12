import { post, get } from 'axios'
import { API_URL } from '@/constants';

export default {
    state: {
        isAdmin: {
            token: null,
            admin: false,
        }
    },
    getters: { token: s => s.isAdmin.token, admin: s => s.isAdmin.admin },
    mutations: {
        setAdmin(state, token) {
            state.isAdmin.token = token;
            state.isAdmin.admin = !!token;
        },
        resetAdmin(state) {
            state.isAdmin.token = null;
            state.isAdmin.admin = false;
        }
    },
    actions: {
        async initAdmin({ commit }) {
            if(!this.getters.admin) {
                try {
                    const token = localStorage.getItem('token');
                    await get(`${ API_URL }admin/isValidToken`, { headers: { Authorization: `Bearer ${ token }` } });
                    commit('setAdmin', token);
                } catch (e) {
                    console.log(`[ERROR] in method initAdmin:\n${ e }`);
                }
            }
        },
        async checkCode({ commit }, code) {
            try {
                const token = (await post(`${API_URL}/admin/sign-in`, { code })).data.token;
                if(!!token) {
                    await commit('setAdmin', token);
                    localStorage.setItem('token', token);
                    return true;
                }
                return false;
            } catch (e) {
                //error processing in next update
                console.log(`[ERROR]: in method checkCode:\n${e}`);
                return false;
            }
        }
    }
};