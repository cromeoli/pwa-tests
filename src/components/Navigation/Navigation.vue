<script lang="ts">
import {defineComponent} from 'vue'
import CircleSelector from "./CircleSelector.vue";
import UploadButton from "./UploadButton.vue";
import MainMenu from "./MainMenu.vue";
import {Circle} from "../../models/Circles.ts";

export default defineComponent({
    name: "Navigation",
    components: {MainMenu, UploadButton, CircleSelector},
    data() {
        return {
            circleCollapsed: true,
            mainMenuCollapsed: true,
            currentCircle: {} as Circle,
        }
    },
    methods: {
        expandCircle() {
            this.circleCollapsed = !this.circleCollapsed;
            this.$emit("toggledCircleMenu");
        }
    }
})
</script>

<template>
    <nav class="uppBoxRow">
        <CircleSelector @click="expandCircle"
                        :class="{'expandedCircleSelector': !circleCollapsed}"
                        v-if="mainMenuCollapsed"
        />
        <UploadButton v-if="circleCollapsed && mainMenuCollapsed"/>
        <MainMenu v-if="circleCollapsed"/>
    </nav>
</template>