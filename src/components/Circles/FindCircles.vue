<script lang="ts">
import {defineComponent} from 'vue'
import {apiService} from "../../services/apiService.ts";
import FindCircleSelector from "./FindCircleSelector.vue";

export default defineComponent({
    name: "FindCircles",
    data() {
        return {
            isClicked: 0,
            modalOpen: false,
            selectedCircleId: 0,
            selectedCircleName: '',
            API: new apiService(),
            joinedCircle: false,
            joinedCircleError: false,
        }
    },
    components: {FindCircleSelector},
    methods: {
        buttonPress(buttonId: number) {
            this.isClicked= buttonId;

            setTimeout(() => {
                this.isClicked= 0;
            }, 500);
        },
        closeModal() {
            this.modalOpen = false;
        },
        openModal(circleId: number, circleName: string) {
            this.selectedCircleId = circleId;
            this.selectedCircleName = circleName;
            this.modalOpen = true;
        },
        joinCircle() {
            this.API.joinCircle(this.selectedCircleId)
                .then(response => {
                    if (response.status == 200) {
                        this.joinedCircle = true;
                        setTimeout(() => {
                            this.joinedCircle = false;
                            this.modalOpen = false;
                        }, 1200);
                    }
                }).catch(
                    //if response is 400
                    error => {
                        console.log(error);
                        this.joinedCircleError = true;
                        setTimeout(() => {
                            this.joinedCircleError = false;
                            this.modalOpen = false;
                        }, 2000);
                    }

            )
        }
    }
})
</script>

<template>
  <main class="mainFrame">
      <FindCircleSelector @circleSelected="openModal"/>
      <RouterLink to="/" class="uppBox uppBox--pink goBackButton"
           :class="{ 'mainButton--onTap': isClicked == 1 }"
           @click="buttonPress(1)"
      >
          Go Back
      </RouterLink>
      <div class="uploadMainframe" v-if="modalOpen">
          <div class="uppBox uppBox--pink modalConfirm">
              ¿Estas seguro de que quieres unirte a este circulo?
              <b>{{ selectedCircleName }}</b>
              <span class="successJoined" v-if="joinedCircle">Unido con éxito</span>
              <span class="failedJoined" v-if="joinedCircleError">
                  Ya perteneces a este círculo!! Vete a bugear otra aplicación!!
              </span>
              <div>
                  <button @click="joinCircle">Sí</button>
                  <button @click="closeModal">No</button>
              </div>
          </div>

      </div>
  </main>

</template>

<style scoped>

</style>