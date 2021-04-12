<template>
    <form @submit.prevent="onSubmit" class="col center">
        <label for="sign-in">Введите пароль администратора</label>
        <input type="password" id="sign-in" v-model="code">
        <button type="submit">Отправить</button>
    </form>
</template>

<script>
    export default {
        name: "SignIn",
        data: () => ({
            code: null
        }),
        methods: {
            async onSubmit() {
                if(await this.$store.dispatch('checkCode', this.code)) {
                    await this.$router.push('/');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    form {
        width: 100%;
        height: 100vh;
        justify-content: space-around;
        label {
            font-family: "AvenirNextCyr Medium";
            font-size: 32px;
        }
        button {
            width: 20%;
            height: 40px;
            padding: 5px 0;
            font-size: 20px;
            border: 1px solid;
            border-radius: 10px;
            cursor: pointer;
            &:hover {
                background-color: black;
                color: white;
            }
        }
    }

    #sign-in {
        width: 30%;
        padding: 10px;
        font-size: 20px;
        border: 1px solid;
    }
</style>