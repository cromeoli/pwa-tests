<script lang="ts">
import {defineComponent} from 'vue'
import {apiService} from "../../services/apiService.ts";
import {Circle} from "../../models/Circles.ts";

export default defineComponent({
    name: "CreateCircle",
    data() {
        return {
            myCircles: [] as Circle[],
            API: new apiService(),
            isClicked: 0,
            modalOpen: false,
            circleName: '',
        }
    },
    emits: ['circleCreated'],
    methods: {
        buttonPress(buttonId: number) {
            this.isClicked= buttonId;
            this.modalOpen = true;

            setTimeout(() => {
                this.isClicked= 0;
            }, 500);
        },
        createCircle() {
            this.API.createCircle(this.circleName)
                .then(response => {
                    if (response.status == 200) {
                        this.$emit('circleCreated')
                        this.modalOpen = false;
                    }
                })
        },
    }
})
</script>

<template>
  <div class="uppBox uppBox--yellow createCircle"
        :class="{ 'mainButton--onTap': isClicked == 1 }"
        @click="buttonPress(1)"
  >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
          <path d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z" />
      </svg>
      <h2>
          Create Circle
      </h2>
  </div>

  <div class="uploadMainframe" v-if="modalOpen">
      <div class="uppBox uppBox--yellow createCircleForm">
          <h2>Create Circle</h2>
          <p>Enter the name of your new circle</p>
          <input v-model="circleName" class="register__inputWrapper__input" type="text" placeholder="Circle name" />
          <button @click="createCircle">Create</button>
          <svg @click="modalOpen = false" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
              <path d="M1.41 0l-1.41 1.41.72.72 1.78 1.81-1.78 1.78-.72.69 1.41 1.44.72-.72 1.81-1.81 1.78 1.81.69.72 1.44-1.44-.72-.69-1.81-1.78 1.81-1.81.72-.72-1.44-1.41-.69.72-1.78 1.78-1.81-1.78-.72-.72z" />
          </svg>
      </div>

  </div>

</template>

<style scoped>

</style>