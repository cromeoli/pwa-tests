<script lang="ts">
import {defineComponent} from 'vue'
import CircleSelector from "./CircleSelector.vue";

export default defineComponent({
    name: "MainMenu",
    components: {CircleSelector},
    data() {
        return {
            isClicked: 0,
            isMenuOpen: false,
            anim: false

        }
    },
    methods: {
        buttonPress(buttonId: number) {
            this.isClicked= buttonId;
            this.$emit('buttonPressed', buttonId);

            this.anim = true;

            setTimeout(() => {
                this.expandCircle()
            }, 310);
            setTimeout(() => {
                this.isClicked= 0;
            }, 500);
        },
        expandCircle() {
            this.isMenuOpen = true
        },
        closeMenu() {
            this.anim = false;
            setTimeout(() => {
                this.isMenuOpen = false
            }, 310);

        }
    }
})
</script>

<template>
    <div class="uppBox mainButton uppBox--blue navButton justified relative"
       :class="{ 'mainButton--onTap': isClicked == 1 }"
    >
        <svg @click="buttonPress(1)" :class="{ 'mainMenu__icon--anim': anim }"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
            <path d="M4 0l-4 4h8l-4-4z" transform="translate(0 2)" />
        </svg>
        <div class="uppBox--blue mainMenu"
             :class="isMenuOpen ? 'open' : 'close'"
        >
            <RouterLink to="/" class="mainMenu__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                    <path d="M4 0l-4 3h1v4h2v-2h2v2h2v-4.03l1 .03-4-3z" />
                </svg>
            </RouterLink>
            <RouterLink to="#" class="mainMenu__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
                    <path d="M4 0c-1.1 0-2 1.12-2 2.5s.9 2.5 2 2.5 2-1.12 2-2.5-.9-2.5-2-2.5zm-2.09 5c-1.06.05-1.91.92-1.91 2v1h8v-1c0-1.08-.84-1.95-1.91-2-.54.61-1.28 1-2.09 1-.81 0-1.55-.39-2.09-1z" />
                </svg>
            </RouterLink>
            <RouterLink to="#" class="mainMenu__icon">
                <svg viewBox="0 0 38 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.485718 29.0429C0.485718 28.7667 0.709575 28.5429 0.985718 28.5429H10.7857C11.0619 28.5429 11.2857 28.7667 11.2857 29.0429V44.2429C11.2857 44.519 11.0619 44.7429 10.7857 44.7429H0.985718C0.709576 44.7429 0.485718 44.519 0.485718 44.2429V29.0429Z" fill="black"/>
                    <path d="M26.7143 34.4429C26.7143 34.1667 26.9381 33.9429 27.2143 33.9429H37.0143C37.2904 33.9429 37.5143 34.1667 37.5143 34.4429V44.2429C37.5143 44.519 37.2904 44.7429 37.0143 44.7429H27.2143C26.9381 44.7429 26.7143 44.519 26.7143 44.2429V34.4429Z" fill="black"/>
                    <path d="M13.6 18.2429C13.6 17.9667 13.8239 17.7429 14.1 17.7429H23.9C24.1761 17.7429 24.4 17.9667 24.4 18.2429V44.2429C24.4 44.519 24.1761 44.7429 23.9 44.7429H14.1C13.8239 44.7429 13.6 44.519 13.6 44.2429V18.2429Z" fill="black"/>
                    <path d="M19.0683 0C16.9093 0 15.1429 1.76645 15.1429 3.92545C15.1429 6.08444 16.9093 7.85089 19.0683 7.85089C21.2273 7.85089 22.9938 6.08444 22.9938 3.92545C22.9938 1.76645 21.2273 0 19.0683 0ZM17.1056 9.4407V15.7018L19.0683 13.7391L21.031 15.7018V9.4407C20.4226 9.6566 19.7553 9.81362 19.0683 9.81362C18.3814 9.81362 17.714 9.6566 17.1056 9.4407Z" fill="black"/>
                    <path d="M0.485718 48.6H37.5143V54H0.485718V48.6Z" fill="black"/>
                </svg>
            </RouterLink>
            <RouterLink to="#" class="mainMenu__icon">
                <svg viewBox="0 0 38 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 9H18V16H0V9Z" fill="black"/>
                    <path d="M10 18H28V25H10V18Z" fill="black"/>
                    <path d="M0 18H8V25H0V18Z" fill="black"/>
                    <path d="M0 0H8V7H0V0Z" fill="black"/>
                    <path d="M30 0H38V7H30V0Z" fill="black"/>
                    <path d="M30 18H38V25H30V18Z" fill="black"/>
                    <path d="M10 0H28V7H10V0Z" fill="black"/>
                    <path d="M20 9H38V16H20V9Z" fill="black"/>
                </svg>
            </RouterLink>
            <RouterLink to="/circles" class="mainMenu__icon">
                <svg viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.8707 17C31.8707 9.67325 25.6514 3.5 17.6854 3.5C9.71934 3.5 3.5 9.67325 3.5 17C3.5 24.3268 9.71934 30.5 17.6854 30.5C25.6514 30.5 31.8707 24.3268 31.8707 17Z" stroke="black" stroke-width="7"/>
                </svg>
            </RouterLink>
            <RouterLink to="#" class="mainMenu__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
                    <path d="M3.5 0l-.5 1.19c-.1.03-.19.08-.28.13l-1.19-.5-.72.72.5 1.19c-.05.1-.09.18-.13.28l-1.19.5v1l1.19.5c.04.1.08.18.13.28l-.5 1.19.72.72 1.19-.5c.09.04.18.09.28.13l.5 1.19h1l.5-1.19c.09-.04.19-.08.28-.13l1.19.5.72-.72-.5-1.19c.04-.09.09-.19.13-.28l1.19-.5v-1l-1.19-.5c-.03-.09-.08-.19-.13-.28l.5-1.19-.72-.72-1.19.5c-.09-.04-.19-.09-.28-.13l-.5-1.19h-1zm.5 2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"
                    />
                </svg>
            </RouterLink>
            <div class="mainMenu__closeIcon" :class="{ 'mainMenu__icon--anim': anim }" @click="closeMenu">
                <svg class="mainMenu__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
                    <path d="M4 0l-4 4h8l-4-4z" transform="translate(0 2)" />
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>