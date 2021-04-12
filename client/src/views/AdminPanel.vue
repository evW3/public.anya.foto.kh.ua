<template>
    <div class="panel">
        <header class="row s-b">
            <button
                class="panel__button row"
                :class="{ 'panel__button_hide': !isOpenFolder }"
                :disabled="!isOpenFolder"
                @click="changeIsOpenFolder"
            >
                <div class="arrow bg-def" />
                <span>Назад</span>
            </button>
            <div class="panel__controllers row">
                <button
                    class="panel__icon trash bg-def"
                    @click="changeDeleteMod"
                    :class="{ 'panel__icon_active': deleteMod }"
                ></button>
                <label
                    for="upload-photo"
                    class="panel__icon download bg-def"
                ></label>
                <input
                    type="file"
                    class="hide"
                    id="upload-photo"
                    @change="upload"
                    accept="image/x-png,image/gif,image/jpeg"
                    multiple
                >
                <button
                    class="panel__icon addFolder bg-def"
                    @click="showModal"
                ></button>
            </div>
        </header>
        <Loader v-if="panel.isLoading"/>
        <body v-else>
            <div class="folders" v-if="!isOpenFolder">
                <Folder
                    v-for="f in panel.folders"
                    :name="f"
                    @delete="deleteFolder"
                    @open="openFolder"
                    :delete-mod="deleteMod"
                />
            </div>
            <div v-else class="photos">
                <Photo
                    v-for="photo in panel.photos"
                    :src="photo.url"
                    :id="photo.id"
                />
            </div>
        </body>
        <FolderName v-if="isModalShow" @close="closeModal"/>
    </div>
</template>

<script>
    import Folder from "../components/Folder";
    import Loader from "../components/Loader";
    import FolderName from "../components/Modal/FolderName";
    import Photo from "../components/Photo";
    import { mapGetters } from 'vuex';

    export default {
        name: "AdminPanel",
        data: () => ({
            isOpenFolder: false,
            deleteMod: false,
            isModalShow: false,
        }),
        async mounted() {
            await this.$store.dispatch('initPanel');
        },
        computed: {
            ...mapGetters(['panel'])
        },
        methods: {
            changeDeleteMod() {
                this.deleteMod = !this.deleteMod;
            },
            showModal() {
                this.isModalShow = true;
            },
            async deleteFolder(folder) {
                await this.$store.dispatch('deleteFolder', folder);
            },
            async closeModal(folder) {
                this.isModalShow = false;
                if(folder) {
                    const isExist = await this.$store.dispatch('isExistFolder', folder);
                    if(isExist === -1) {
                        await this.$store.dispatch('addFolder', folder);
                    } else {
                        console.log('[WARNING] this name of folder already exist');
                    }
                }
            },
            changeIsOpenFolder() {
                this.isOpenFolder = !this.isOpenFolder;
                this.$store.commit('setCurrentFolder', null);
            },
            async openFolder(folder) {
                try {
                    await this.$store.dispatch('loadPhotos', folder);
                    this.$store.commit('setCurrentFolder', folder);
                    this.isOpenFolder = true;
                } catch (e) {
                    console.log(`[ERROR] in component AdminPanel in method openFolder:\n${ e }`);
                }
            },
            async upload(e) {
                if(this.panel.currentFolder) {
                    try {
                        const photo = e.target.files[0];
                        await this.$store.dispatch('uploadPhoto', photo);
                    } catch (e) {
                        console.log(`[ERROR] in component AdminPanel in method upload:\n${ e }`);
                    }
                } else {
                    console.log('[WARNING] select folder and then add photo');
                }
            }
        },
        components: {
            FolderName,
            Folder,
            Loader,
            Photo
        }
    }
</script>

<style scoped lang="scss">
    .panel {
        padding: 30px 130px;
        button {
            cursor: pointer;
        }
        header {
            align-items: center;
            margin-bottom: 40px;
        }
        &__button {
            width: 160px;
            height: 40px;
            padding: 0 13px;
            align-items: center;
            border: 3px solid black;
            & .arrow {
                width: 21px;
                height: 21px;
                margin-right: 20px;
            }
            & span {
                font-size: 16px;
            }
            &_hide {
                opacity: 0;
                cursor: default!important;
            }
        }
        &__icon {
            width: 66px;
            height: 66px;
            border-radius: 50%;
            background-color: transparent;
            &:hover {
                background-color: #E3E1E1;
            }
            &_active {
                background-color: #E3E1E1;
            }
        }
        &__icon + &__icon {
            margin: 0 15px 0 15px;
        }
    }
    .folders {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 30px;
    }
    .photos {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 30px;
    }
    .hide {
        display: none;
    }
</style>