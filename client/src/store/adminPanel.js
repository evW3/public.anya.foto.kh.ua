import axios from 'axios'
import { API_URL } from '@/constants';

export default {
    state: {
        panel: {
            folders: [],
            photoSessionName: null,
            photos: [],
            currentFolder: null,
            isLoading: true,
        }
    },
    getters: { panel: s => s.panel },
    mutations: {
        setPanel(state, params) {
            state.panel.folders = params.folders;
        },
        setIsLoading(state, loading) {
            state.panel.isLoading = loading;
        },
        setCurrentFolder(state, folder) {
            state.panel.currentFolder = folder;
        },
        addPhoto(state, photo) {
            state.panel.photos.push(photo);
        }
    },
    actions: {
        async initPanel({ commit, dispatch }) {
            try {
                this.getters.panel.folders = (await axios.get(`${ API_URL }gallery/folders/`)).data.folders;
                setTimeout(async () => {
                    await commit('setIsLoading', false);
                }, 1000);
            } catch (e) {
                console.log(`[ERROR] in method initPanel:\n${ e }`)
                await commit('setIsLoading', false);
            }
        },
        async deleteFolder({ commit, dispatch }, folder) {
            try {
                await commit('setIsLoading', true);
                const token = localStorage.getItem('token');
                await axios.delete(`${ API_URL }gallery/folders/${ folder }`,
                    { headers: { Authorization: `Bearer ${ token }` } });
                this.getters.panel.folders.splice(this.getters.panel.folders.findIndex(item => item === folder), 1);
                setTimeout(async () => {
                    await commit('setIsLoading', false);
                }, 1000);
            } catch (e) {
                console.log(`[ERROR] in method deleteFolder:\n${ e }`);
                await commit('setIsLoading', false);
            }
        },
        addFolder({ commit, dispatch }, folder) {
            this.getters.panel.folders.push(folder);
        },
        isExistFolder({ commit, dispatch }, folder) {
            return this.getters.panel.folders.findIndex(item => item === folder);
        },
        async loadPhotos({ commit, dispatch }, photoSessionName) {
            try {
                await commit('setIsLoading', true);
                let state = this.getters.panel;
                state.photoSessionName = photoSessionName;
                const token = localStorage.getItem('token');
                state.photos = (await axios.get(`${ API_URL }gallery/photos/${ photoSessionName }`, { headers: { Authorization: `Bearer ${ token }` }, })).data.photos;
                setTimeout(async () => {
                    await commit('setIsLoading', false);
                }, 1000);
            } catch (e) {
                console.log(`[ERROR] in method loadPhotos: \n${ e }`);
                await commit('setIsLoading', false);
            }
        },
        async uploadPhoto({ commit, dispatch }, photo) {
            try {
                await commit('setIsLoading', true);
                const formData = new FormData();
                const token = localStorage.getItem('token');
                formData.append('photo', photo);
                formData.append('main', this.getters.panel.photos?.length ? '0' : '1');
                formData.append('photoSessionName', this.getters.panel.currentFolder);
                const {url, id} = (await axios.put(`${ API_URL }gallery/photos/`,
                    formData,
                    {
                        headers: { Authorization: `Bearer ${ token }`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )).data;
                commit('addPhoto', { url, id });
                setTimeout(async () => {
                    await commit('setIsLoading', false);
                }, 1000);
            } catch (e) {
                console.log(`[ERROR] in component AdminPanel in method upload:\n${ e }`);
            }
        },
    }
};