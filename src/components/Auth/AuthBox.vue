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

      <RegisterForm v-if="authClicked == 2"/>
      <LoginForm v-if="authClicked == 1"/>

  </div>

</template>