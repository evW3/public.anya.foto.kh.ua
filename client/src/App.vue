<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script>
    import MainLayout from "./layouts/MainLayout";
    export default {
        computed: {
            layout() {
                return (this.$route.meta.layout || "empty") + "-layout";
            }
        },
        mounted() {
            this.$store.dispatch('initAdmin');
        },
        components: {
            MainLayout
        }
    };
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: 100vh;
    }
</style>
