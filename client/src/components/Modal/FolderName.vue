<template>
    <div class="modal-backdrop row center">
        <div class="modal col">
            <div class="modal__title">Форма ввода имени папки</div>
            <form @submit.prevent="onSubmit" class="col center">
                <input
                    type="text"
                    placeholder="Название папки"
                    v-model="folderName"
                    class="modal__input"
                >
                <div >
                    <button type="submit" class="modal__submit">Сохранить</button>
                    <button class="modal__exit" @click="close">Отменить</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { get } from 'axios';
    import { API_URL } from "@/constants";

    export default {
        name: "FolderName",
        data: () => ({
            folderName: null,
            request: 0
        }),
        methods: {
            async onSubmit() {
                this.request += 1;
                if(this.request < 2) {
                    const isUniqueness = (await get(`${ API_URL }gallery/folders/${ this.folderName }`)).data.isUniqueness;
                    if(isUniqueness) {
                        this.$emit('close', this.folderName);
                    }
                    this.request = 0;
                }
            },
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style scoped lang="scss">
    .modal-backdrop {
        position: fixed;
        justify-content: center;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        align-items: center;
        background-color: rgba(0, 0, 0, .5);
    }

    .modal {
        padding: 20px;
        background-color: white;
        &__title {
            font-size: 16px;
            font-family: "AvenirNextCyr Bold";
            margin-bottom: 40px;
        }
        &__input {
            padding: 5px 10px;
            font-size: 16px;
            border: 1px solid black;
            width: 100%;
            margin-bottom: 30px;
        }
        &__submit, &__exit {
            font-size: 16px;
            padding: 5px 15px;
            font-family: "AvenirNextCyr Medium";
            cursor: pointer;
        }
        &__submit {
            color: white;
            margin-right: 15px;
            background-color: black;
        }
        &__exit {
            &:hover {
                background-color: #FF7043;
                color: white;
            }
        }
    }
</style>