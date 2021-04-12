<template>
    <div class="photo" :class="{ 'photo_none': isDeleted }">
        <button
            class="photo__delete"
            @click="deletePhoto"
        >✖</button>
        <img
            :src="src"
        />
    </div>
</template>

<script>
    import axios from 'axios';
    import { API_URL } from "../constants";
    import { mapGetters } from 'vuex'
    export default {
        name: "Photo",
        props: {
            src: String,
            id: Number,
        },
        data: () => ({
            isDeleted: false
        }),
        computed: {
            ...mapGetters(['token'])
        },
        methods: {
            async deletePhoto() {
                try {
                    await axios.delete(`${ API_URL }gallery/photos/${ this.id }`,
                        {
                                headers: { Authorization: `Bearer ${ this.token }` },
                                data: {
                                    url: this.src
                                }
                            }
                        );
                    this.isDeleted = true;
                } catch (e) {
                    console.log(`[ERROR] in component Photo, method deletePhoto:\n ${ e }`);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .photo {
        position: relative;
        &_none {
            display: none!important;
        }
        &__delete {
            position: absolute;
            width: 35px;
            height: 35px;
            top: 0;
            right: 0;
            font-size: 25px;
            color: white;
            font-family: "AvenirNextCyr Bold";
            background-color: black;
            cursor: pointer;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
</style>