<template>
    <main class="mainFrame">
        <Post v-if="authIsClosed"/>
        <AuthBox v-else
                 :authClicked="authClicked"
                 @userAuthenticated="userAuthenticated = true"
                 @closeMenu="closeAuthMenu"
        />

        <CircleSelector v-if="!userAuthenticated"/>
        <CircleMenu v-if="circleMenuIsOpen"
                    :class="{'circleMenu--height': circleMenuAnimation}"
        />

        <Navigation v-if="userAuthenticated"
                    @toggledCircleMenu="toggleCircleMenu"
        >

        </Navigation>
        <RegisterButtons v-else @buttonPressed="toggleAuthMenu"/>
    </main>
</template>

<script lang="ts">
import Post from "./Post.vue";
import RegisterButtons from "./RegisterButtons.vue";
import AuthBox from "../Auth/AuthBox.vue";
import Activity from "../Activity.vue";
import Navigation from "../Navigation/Navigation.vue";
import CircleSelector from "../Navigation/CircleSelector.vue";
import CircleMenu from "../Navigation/CircleMenu.vue";

export default {
    components: {
        CircleMenu,
        CircleSelector,
        Navigation,
        Activity,
        Post,
        RegisterButtons: RegisterButtons,
        AuthBox: AuthBox,
    },
    data() {
        return {
            authClicked: 0,
            authIsClosed: true,
            userAuthenticated: false,
            circleMenuIsOpen: false,
            circleMenuAnimation: false,
            currentCircle: "Global",
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
            console.log("closeAuthMenu");
            this.authIsClosed = true;
        },
        toggleCircleMenu() {
            //if the menu is closed, open it, wait and start the animation.
            if (!this.circleMenuIsOpen) {
                this.circleMenuIsOpen = true;
                setTimeout(() => {
                    this.circleMenuAnimation = true;
                }, 100);
            } else {
                // If is open, turn false the animation, wait and then close it
                this.circleMenuAnimation = false;
                setTimeout(() => {
                    this.circleMenuIsOpen = false;
                }, 1000);
            }



        }
    }
};
</script>