<script lang="ts">
import {defineComponent} from 'vue'
import RegisterForm from "./RegisterForm.vue";
import LoginForm from "./LoginForm.vue";

export default defineComponent({
    name: "AuthBox",
    props: {
        authClicked: Number,
    },
    data() {
        return {
            selectedMenu: 0
        };
    },
    methods: {
        authSuccess() {
            this.$emit('userAuthenticated');
        }
    },

    components: {
        RegisterForm: RegisterForm,
        LoginForm: LoginForm
    }
})


</script>

<template>
  <div class="uppBox uppBox--blue authBox"
        :class="{ 'uppBox--white': authClicked == 1 }"
  >

      <RegisterForm v-if="authClicked == 2" @authSuccess="authSuccess"/>
      <LoginForm v-if="authClicked == 1" @authSuccess="authSuccess"/>

  </div>

</template>