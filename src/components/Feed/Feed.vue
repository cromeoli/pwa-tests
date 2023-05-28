<template>
    <div class="mainFrame">
        <div>Actividad</div>
        <Post v-if="authIsClosed"/>
        <AuthBox v-else :authClicked="authClicked"/>
        <h2 class="uppBox mainButton uppBox--pink justified">
            Global
        </h2>
        <RegisterButtons @buttonPressed="toggleAuthMenu"/>
    </div>
</template>

<script lang="ts">
import Post from "./Post.vue";
import RegisterButtons from "./RegisterButtons.vue";
import AuthBox from "../Auth/AuthBox.vue";

export default {
    components: {
        Post,
        RegisterButtons: RegisterButtons,
        AuthBox: AuthBox,
    },
    data() {
        return {
            authClicked: 0,
            authIsClosed: true,
        };
    },
    methods: {
        toggleAuthMenu(buttonId: number) {
            if (this.authIsClosed || this.authClicked == buttonId) {
                this.authIsClosed = !this.authIsClosed;
            }
            this.authClicked = buttonId;
        }
    }
};
</script>