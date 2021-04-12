<template>
    <div class="slider">
        <div class="slider__controllers">
            <button
                class="arrow-left arrow-white arrow-white_r bg-def"
                @click="control(-1)"
                :class="{'arrow-left_hidden': !isArrowLeft}"
            />
            <button
                class="exit"
                @click="closeSlider"
            >Закрыть окно</button>
            <button
                class="arrow-right arrow-white bg-def"
                :class="{'arrow-right_hidden': !isArrowRight}"
                @click="control(1)"
            />
        </div>
        <main>
            <Loader v-if="isLoading"/>
            <div v-else class="slider__view">
                <img
                    v-for="photo in gallery.photos"
                    :src="photo.url"
                    alt="image"
                    class="slider__image"
                    :class="{ 'slider__image_active': photo.url === active }"
                >
            </div>
        </main>
    </div>
</template>

<script>
    import Loader from "./Loader";
    import { mapGetters } from 'vuex'

    export default {
        name: "slider",
        data: () => ({
            someCounter: 0,
            isLoading: true,
        }),
        props: {
            idx: Number
        },
        components: { Loader },
        computed: {
            ...mapGetters(['gallery']),
            active: function () {
                return this.gallery.photos[this.someCounter].url
            },
            isArrowLeft: function () {
                return this.someCounter !== 0;
            },
            isArrowRight: function () {
                return this.gallery.photos.length > this.someCounter+1;
            }
        },
        async mounted() {
            this.isLoading = false;
            this.someCounter = this.idx;
        },
        methods: {
            control(action) {
                if(
                    ((action > 0 && this.someCounter >= 0) ||
                        (action < 0 && this.someCounter > 0)) &&
                    (this.someCounter + action < this.gallery.photos.length)
                ) {
                    this.someCounter += action;
                }
            },
            closeSlider() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .slider {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        &__controllers {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
        }

        & main {
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            background-color: black;
            display: flex;
        }

        &__image {
            display: none;
            background-color: black;
            pointer-events: none;
        }

        &__view {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
        }

        &__image_active {
            display: block;
            position: relative;
        }

        &__image_hide {
            display: block;
            position: relative;
        }
    }

    .arrow-left, .arrow-right{
        height: 100%!important;
        width: 70px;
        z-index: 1;
        text-align: center;
        background-color: transparent;
        cursor: pointer;
    }

    .arrow-left_hidden, .arrow-right_hidden {
        opacity: 0;
        cursor: default!important;
    }

    .exit {
        width: 200px;
        top: 0;
        left: calc(50% - 100px);
        height: 50px;
        z-index: 1;
        font-size: 20px;
        color: white;
        cursor: pointer;
        background-color: black;
    }

    .right {
        right: 0;
    }
    
    .arrow-white {
        width: 60px;
        height: 60px;
        margin-right: 20px;
        -webkit-background-size: 60px 60px;
        background-size: 60px 60px;
    }

    .arrow-white_r {
        margin-right: 0;
        margin-left: 20px;
    }
</style>