<script lang="ts">
import {defineComponent} from 'vue'
import {Circle} from "../../models/Circles.ts";
import {apiService} from "../../services/apiService.ts";

export default defineComponent({
    name: "CircleCardContainer",
    emits: ['deleteClicked', 'circleLeaved', 'circleCreatedReceived'],
    props: {
        circleLeaved: Boolean,
        circleCreated: Boolean,
    },
    data() {
        return {
            myCircles: [] as Circle[],
            API: new apiService(),
            isClicked: 0,
            authUserid: localStorage.getItem('id'),
            modalOpen: false,
            circleClicked: 0,
        }
    },
    watch: {
        circleLeaved() {
            this.getMyCircles()
            this.$emit('circleLeaved')
        },
        circleCreated() {
            this.getMyCircles()
            this.$emit('circleCreatedReceived')
        }
    },
    mounted() {
        this.getMyCircles()
    },
    methods: {
        getMyCircles(){
            this.API.getMyCircles()
                .then(response => {
                    this.myCircles = response.data.circles
                })
        },
        buttonPress(buttonId: number) {
            this.isClicked= buttonId;
            switch (buttonId) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    this.modalOpen = true;
                    break;
            }

            setTimeout(() => {
                this.isClicked= 0;
            }, 500);
        },
        closeModal() {
            this.modalOpen = false;
        },
    },
})
</script>

<template>
    <div class="circles__circleCardContainer">
        <div class="uppBox uppBox--pink"
             v-for="circle in myCircles" :key="circle.id"
        >
            <h3>{{ circle.name }}</h3>
            <svg @click="$emit('deleteClicked', circle.id, circle.name)" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                <path d="M1.41 0l-1.41 1.41.72.72 1.78 1.81-1.78 1.78-.72.69 1.41 1.44.72-.72 1.81-1.81 1.78 1.81.69.72 1.44-1.44-.72-.69-1.81-1.78 1.81-1.81.72-.72-1.44-1.41-.69.72-1.78 1.78-1.81-1.78-.72-.72z" />
            </svg>
        </div>
    </div>
</template>

<style scoped>

</style>