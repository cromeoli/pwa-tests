<script lang="ts">
import {defineComponent} from 'vue'
import {apiService} from "../../services/apiService.ts";

export default defineComponent({
    name: "RegisterForm.vue",
    data() {
        return {
            email: "",
            password: "",
            visibility: true,
            notValidEmail: false,
            notValidPassword: false,
            emailInUse: false,
            loginError: false,
            serverError: false,
            loged: false,
            API: new apiService()
        }
    },
    emits: ["authSuccess"],
    methods: {
        toggleVisibility(){
            this.visibility = !this.visibility;
        },
        validateEmail(){
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            emailRegex.test(this.email) ?
                this.notValidEmail = false :
                this.notValidEmail = true
        },
        validatePassword(){
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|:;"'<>?,./])(?=.*[A-Z]).{8,}$/;

            console.log(passwordRegex.test(this.password))

            passwordRegex.test(this.password) ?
                this.notValidPassword = false :
                this.notValidPassword = true

            console.log(this.notValidPassword)
        },
        async login() {
            this.API.login(this.email, this.password)
                .then(response => {
                    if(response.status === 200){
                        this.loginError = false
                        localStorage.setItem("id", response.data.user.id)
                        localStorage.setItem("nickname", response.data.user.nickname)
                        localStorage.setItem("token", response.data.token)
                        this.loged = true

                        setTimeout(() => {
                            this.$emit("authSuccess")
                        }, 2000);
                    }
                }).catch(error => {
                    if(error.response.status === 401){
                        this.loginError = true
                        console.error("Unauthorized");
                        return;
                    }else{
                        console.log("El server error")
                    }
                    console.error(error);
                })

            setTimeout(() => {
                this.loged = false
            }, 2000);
        }
    }
})
</script>

<template>
    <h1 class="authBox__title">Bienvenido</h1>
    <form class="register ">

        <label class="register__label">Email</label>
        <div class="register__inputWrapper">
            <input class="register__inputWrapper__input uppBox--pink"
                   type="email"
                   v-model="email"
                   v-on:blur="validateEmail"
                   :class="{'register__inputWrapper__input--error': notValidEmail || emailInUse}"
            >
        </div>

        <label class="register__label">Contraseña</label>
        <div class="register__inputWrapper">
            <input class="register__inputWrapper__input uppBox--pink"
                   :type="visibility ? 'password' : 'text'"
                   v-model="password"
                   v-on:blur="validatePassword"
                   :class="{'register__inputWrapper__input--error': notValidPassword}"
            >
            <i class="material-icons register__inputWrapper__icon"
               @click="toggleVisibility"
            >
                {{ visibility ? "visibility" : "visibility_off" }}
            </i>
        </div>

        <button class="register__button"
                @click="login"
                type="button"
        >
            Entrar
        </button>

        <div class="register__errorbox">
            <p v-if="emailInUse" class="error errorPasswd">
                <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i>
                Ese email ya está en uso
            </p>
            <p v-if="notValidEmail" class="error errorPasswd">
                <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i> El email debe estar en formato ***@example con una extensión valida
            </p>
            <p v-if="notValidPassword" class="error errorPasswd">
                <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i> La debe contener al menos 8 caracteres, una mayúscula, un
                símbolo y un número
            </p>
            <p v-if="loginError" class="error errorPasswd">
                <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i>
                Error en el email o contraseña introducidos
            </p>
            <p v-if="serverError" class="error errorPasswd">
                <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i>
                Error en el servidor
            </p>
        </div>

        <span v-if="loged" class="register__success">
                ¡Autenticado con éxito!
        </span>

    </form>
</template>

<style scoped>

</style>