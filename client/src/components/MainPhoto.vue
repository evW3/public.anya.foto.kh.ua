<template>
        <div
            class="main-photo"
            :style="{
                'grid-column': `span ${ photo.relationWidth }` ,
                'grid-row': `span ${ photo.relationHeight }`,
            }"
            @click="openFolder"
        >
<!--                <div class="main-photo__hover-blur row center">-->
<!--                    <div class="main-photo__button row center">-->
<!--                        <button>Перейти</button>-->
<!--                        <div class="arrow-white"></div>-->
<!--                    </div>-->
<!--                </div>-->
            <slot></slot>
            <img
                :src="photo.url"
                :alt="`Image №${ photo.id }`"
                :style="{'animation-duration': `${ idx * 250 }ms`}"
            >
        </div>
</template>

<script>
    export default {
        name: "MainPhoto",
        props: { photo: Object, idx: Number },
        methods: {
            openFolder() {
                this.$emit('open');
            }
        }
    }
</script>

<style scoped lang="scss">
    .main-photo {
        position: relative;
        img {
            width: 100%;
            height: 100%;
            animation-name: fade;
            object-fit: cover;
        }
    }
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>