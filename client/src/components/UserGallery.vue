<template>
    <div class="container" :class="{'container_f': currentTab.slider }">
        <Loader v-if="gallery.isLoading"/>
        <div class="gallery" v-else-if="currentTab.gallery">
            <MainPhoto
                v-for="(photo, idx) in gallery.photos"
                :key="idx"
                :photo="photo"
                :idx="idx"
                @open="openFolder(photo.photoSessionName)"
            >
                <div class="main-photo__hover-blur row center">
                    <div class="main-photo__button row center">
                        <button>Перейти</button>
                        <div class="arrow-white bg-def"></div>
                    </div>
                </div>
            </MainPhoto>
        </div>
        <div class="folder row b-l" v-else-if="currentTab.folder">
            <div class="folder__button col center" @click="openGallery">
                <button>Назад</button>
                <div class="arrow-white arrow-white_r bg-def"></div>
            </div>
            <body class="folder__body">
            <MainPhoto
                v-for="(photo, idx) in gallery.photos"
                :key="idx"
                :photo="photo"
                :idx="idx"
                @open="openSlider(idx)"
            >
                <div class="main-photo__hover-blur col center">
                    <div class="magnifying-glass"></div>
                    <button>Раскрыть в полный экран</button>
                </div>
            </MainPhoto>
            </body>
        </div>
        <Slider
            v-if="currentTab.slider"
            :idx="currentIndex"
            @close="closeSlider"
        />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import MainPhoto from "../components/MainPhoto";
    import Slider from "../components/Slider";
    import Loader from "../components/Loader";

    export default {
        name: 'Gallery',
        data: () => ({
            currentTab: {
                gallery: true,
                folder: false,
                slider: false,
            },
            currentIndex: null,
        }),
        computed: {
            ...mapGetters(['gallery'])
        },
        async mounted() {
            await this.$store.dispatch('initGallery');
        },
        methods: {
            async openFolder(folder) {
                this.currentTab.gallery = false;
                await this.$store.dispatch('galleryLoadFolderPhotos', folder);
                this.currentTab.folder = true;
            },
            openSlider(idx) {
                this.currentIndex = idx;
                this.currentTab.slider = true;
                this.currentTab.folder = false;
            },
            closeSlider() {
                this.currentTab.slider = false;
                this.currentTab.folder = true;
            },
            async openGallery() {
                this.currentTab.folder = false;
                await this.$store.dispatch('initGallery');
                this.currentTab.gallery = true;
            }
        },
        components: {
            MainPhoto,
            Slider,
            Loader
        }
    }
</script>

<style scoped lang="scss">
    .container {
        width: 100%;
        height: 100%;
        padding-top: 18px;
    }

    button {
        background-color: transparent;
        color: white;
        cursor: pointer;
    }

    .gallery, .folder__body {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-gap: 20px;
        grid-auto-rows: 200px;
        grid-auto-flow: dense;
        padding: 0 30px;
    }

    .folder {
        position: absolute;
        top: 2px;
        &__button {
            position: fixed;
            padding: 0 10px ;
            top: 66px;
            left:0;
            bottom: 0;
            background-color: black;
            cursor: pointer;
            button {
                margin-bottom: 18px;
            }
        }
        &__body {
            padding: 0 0 0 62px;
            grid-gap: 1px;
        }
    }

    /* need moved code */
    .main-photo__hover-blur {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.2s;
        backdrop-filter: blur(10px);
        &:hover {
            opacity: 1;
        }
        cursor: pointer;
    }
    .main-photo__button {
        width: 160px;
        height: 45px;
        padding: 13px;
        justify-content: flex-end;
        border: 2px solid white;
        cursor: pointer;
        button {
            background-color: transparent;
            margin-right: 16px;
            cursor: pointer;
            color: white;
        }
        &:hover {
            background-color: black;
            border: none;
        }
    }
    .arrow-white {
        width: 21px;
        height: 21px;
    }
    .magnifying-glass {
        width: 40px;
        height: 40px;
        margin-bottom: 18px;
    }
    /* need moved code */
</style>
