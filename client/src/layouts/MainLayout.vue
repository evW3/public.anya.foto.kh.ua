<template>
    <main>
        <Header/>
        <div class="content">
            <router-view />
        </div>
    </main>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "MainLayout",
        components: { Header }
    }
</script>

<style lang="scss" scoped>
    main {
        width: 100%;
        height: 100vh;
    }
    .content {
        position: absolute;
        top: 66px;
        bottom: 0;
        right: 0;
        left: 0;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>