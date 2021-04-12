<template>
    <button
        class="folder col center"
        @click="openFolder"
        :class="{ 'folder_not-allowed': deleteMod }"
    >
        <img src="../assets/imgs/icons/adminPanel/folder.svg" alt="Folder icon">
        <span>{{ name }}</span>
    </button>
</template>

<script>
    export default {
        name: "Folder",
        props: {
            name: String,
            deleteMod: Boolean,
        },
        methods: {
            async openFolder() {
                if(this.deleteMod) {
                    this.$emit('delete', this.name);
                } else {
                    this.$emit('open', this.name);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .folder {
        border: 3px solid black;
        padding: 40px;
        &_not-allowed {
            cursor: not-allowed!important;
        }
        span {
            margin-top: 20px;
        }
    }
</style>