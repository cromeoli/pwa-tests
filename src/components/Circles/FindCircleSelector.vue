<script lang="ts">
import {defineComponent} from 'vue'
import {Circle} from "../../models/Circles.ts";
import {apiService} from "../../services/apiService.ts";

export default defineComponent({
    name: "FindCircleSelector",
    data() {
        return {
            myCircles: [] as Circle[],
            API: new apiService(),
            isClicked: 0,
        }
    },
    emits: ['circleSelected'],
    mounted() {
        this.getAllCircles()
    },
    methods: {
        getAllCircles(){
            this.API.getAllCircles()
                .then(response => {
                    this.myCircles = response.data.circles
                })
        },

    }
})
</script>

<template>
    <div class="uppBox uppBox--white findCircles">
        <div class="findCirclesContainer">
            <div class="uppBox uppBox--yellow"
                 v-for="circle in myCircles" :key="circle.id"
            >
                <h3>{{ circle.name }}</h3>
                <svg @click="$emit('circleSelected', circle.id, circle.name)" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                    <path d="M4 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 1l3 3-3 3v-2h-3v-2h3v-2z" />
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>