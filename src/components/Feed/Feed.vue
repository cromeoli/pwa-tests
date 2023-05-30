<template>
    <main class="mainFrame">
        <Activity v-if="authIsClosed"/>
        <Post v-if="authIsClosed"/>
        <AuthBox v-else
                 :authClicked="authClicked"
                 @userAuthenticated="closeAuthMenu"
        />
        <h2 class="uppBox mainButton uppBox--pink justified">
            Global
        </h2>
        <RegisterButtons @buttonPressed="toggleAuthMenu"/>

    </main>
</template>

<script lang="ts">
import Post from "./Post.vue";
import RegisterButtons from "./RegisterButtons.vue";
import AuthBox from "../Auth/AuthBox.vue";
import Activity from "../Activity.vue";

export default {
    components: {
        Activity,
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
        },
        closeAuthMenu() {
            this.authIsClosed = true;
        }
    }
};
</script>