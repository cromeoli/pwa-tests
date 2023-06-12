<script lang="ts">
import {defineComponent} from 'vue'
import {Circle} from "../../models/Circles.ts";

export default defineComponent({
    name: "CircleSelector",
    props: {
        currentCircle: {
            type: Object as () => Circle,
            required: false
        },
    },
    data() {
        return {
            menuIsOpen: false,
            isClicked: 0,
            animation: false
        }
    },
    methods: {
        buttonPress(buttonId: number) {
            this.isClicked= buttonId;
            setTimeout(() => {
                this.isClicked= 0;
            }, 500);
        },
    }
})
</script>

<template>
    <div class="uppBox mainButton uppBox--pink justified navButton--Circle"
         @click="buttonPress(1)"
          :class="{'mainButton--onTap': isClicked === 1}"
    >
        {{ currentCircle?.name }}
    </div>
</template>