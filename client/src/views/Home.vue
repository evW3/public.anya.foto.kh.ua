<template>
    <UserGallery v-if="!admin"/>
    <AdminPanel v-else />
</template>

<script>
import UserGallery from "../components/UserGallery";
import AdminPanel from "./AdminPanel";
import { mapGetters } from 'vuex'

export default {
    name: 'Gallery',
    computed: {
        ...mapGetters(['admin'])
    },
    components: { UserGallery, AdminPanel }
}
</script>