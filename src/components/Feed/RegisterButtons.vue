<script lang="ts">
export default {
    data() {
        return {
            isClicked: 0
        }
    },
    methods: {

        buttonPress(buttonId: number) {
            this.isClicked= buttonId;
            this.$emit('buttonPressed', buttonId);
            setTimeout(() => {
                this.isClicked= 0;
            }, 500);
        }
    }
}

</script>

<template>
    <div class="registerButtonsBox">
        <h3 class="uppBox mainButton uppBox--white justified"
            @click="buttonPress(1)"
            :class="{ 'mainButton--onTap': isClicked == 1 }"
        >
            Sign In
        </h3>
        <h3 class="uppBox mainButton uppBox--blue justified"
            @click="buttonPress(2)"
            :class="{ 'mainButton--onTap': isClicked == 2}"
        >
            Sign Upp!
        </h3>
    </div>
</template>