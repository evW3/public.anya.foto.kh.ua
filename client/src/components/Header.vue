<template>
    <header class="row center s-b">
        <a class="logo" href="/">Anya.Photo</a>
        <nav class="menu row">
            <router-link
                v-for="p in pages"
                :to="p.link"
                class="menu__item row center"
                :class="{ 'menu__item_active': active === p.link }"
                @click="changeActive(p.pageName)"
            >
                {{ p.pageName }}
            </router-link>
        </nav>
        <div class="feedback row">
            <a
                href="https://www.facebook.com/berezutskaya"
                target="_blank"
                class="facebook feedback__icon bg-def"
            ></a>
            <a
                href="https://t.me/Berezutskaya_photo"
                target="_blank"
                class="telegram feedback__icon bg-def"
            ></a>
            <a
                href="https://www.instagram.com/anna_berezutskaya_photo/"
                target="_blank"
                class="instagram feedback__icon bg-def"
            ></a>
        </div>
        <button
            class="logout bg-def"
            @click="logout"
            :class="{ 'logout_hide': !admin }"
        ></button>
    </header>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "Header",
        data: () => ({
            active: null,
            pages: [{ link:'/', pageName: "Портфолио" }, { link:'/prices', pageName: "Прайс" }, { link:'/planning', pageName: "График" }]
        }),
        mounted() {
            const { value: {fullPath} } = this.$router.currentRoute;
            this.active = fullPath;
        },
        computed : {
            ...mapGetters(['admin'])
        },
        methods: {
            changeActive(page) {
                this.active = page;
            },
            logout() {
                localStorage.removeItem('token');
                this.$store.commit('resetAdmin');
            }
        }
    }
</script>

<style scoped lang="scss">
    header {
        width: 100%;
        height: 66px;
        padding: 0 200px;
        z-index: 10;
        box-shadow: 0 0 40px rgba(0, 0, 0, .2);
    }

    .logo {
        font-size: 24px;
        cursor: pointer;
        user-select: none;
    }

    .menu__item {
        width: 120px;
        user-select: none;
        height: 35px;
    }

    .menu__item+.menu__item {
        margin-left: 17px;
    }

    .menu__item:hover, .menu__item_active {
        font-family: 'AvenirNextCyr Bold';
        transition: background-color 0.3s;
        color: white;
        background-color: black;
    }

    .feedback {
        &__icon {
            width: 30px;
            height: 30px;
            cursor: pointer;
            border-radius: 50%;
            background-size: 30px 30px;
        }

        &__icon + &__icon {
            margin-left: 15px;
        }
    }

    .facebook {
        background-image: url('../assets/imgs/icons/header/facebook.png');
    }

    .telegram {
        background-image: url('../assets/imgs/icons/header/telegram.png');
    }

    .instagram {
        background-image: url('../assets/imgs/icons/header/instagram.png');
    }

    .logout {
        width: 40px;
        height: 40px;
        cursor: pointer;
        &_hide {
            display: none;
        }
    }
</style>