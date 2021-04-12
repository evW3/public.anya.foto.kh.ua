import { get } from 'axios'
import { API_URL } from '@/constants';

export default {
    state: {
        gallery: {
            photos: [],
            photoSessionName: null,
            isLoading: true
        }
    },
    getters: { gallery: s => s.gallery },
    mutations: {
        setIsLoading(state, loading) {
            state.gallery.isLoading = loading;
        }
    },
    actions: {
        async initGallery({ dispatch, commit }) {
            try {
                this.getters.gallery.photos = (await get(`${ API_URL }gallery/main-photos`)).data.photos;
                this.getters.gallery.photos.map(item => dispatch('relations', item));
                setTimeout(async () => {
                    await commit('setIsLoading', false);
                }, 1000);
            } catch (e) {
                console.log(`[ERROR] in method initGallery:\n${ e }`);
                commit('setIsLoading', false);
            }
        },
        async galleryLoadFolderPhotos({ dispatch, commit }, folder) {
            try {
                commit('setIsLoading', true);
                this.getters.gallery.photos = (await get(`${ API_URL }gallery/photos/${ folder }`)).data.photos;
                this.getters.gallery.photos.map(item => dispatch('relations', item));
                setTimeout(async () => {
                    await commit('setIsLoading', false);
                }, 1000);
            } catch (e) {
                console.log(`[ERROR] in method galleryLoadFolderPhotos:\n${ e }`);
                commit('setIsLoading', false);
            }
        },
        relations({ commit }, item) {
            const tmpImg = new Image();
            tmpImg.onload = () => {
                item.relationWidth = Number(window.innerWidth / tmpImg.width).toFixed(0) <= 2 ? 2 : 1;
                item.relationHeight = Number(window.innerHeight / tmpImg.height).toFixed(0) <= 2? 2 : 1;
                Number(tmpImg.width / tmpImg.height) < 1 ? item.relationHeigh += 1 : item.relationWidth += 2;
                return item;
            }
            tmpImg.src = item.url;
        }
    }
};