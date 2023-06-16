<script lang="ts">
import {defineComponent} from 'vue'
import MainMenu from "../Navigation/MainMenu.vue";
import CreateCircle from "./CreateCircle.vue";
import {Circle} from "../../models/Circles.ts";
import {apiService} from "../../services/apiService.ts";
import CircleCardContainer from "./CircleCardContainer.vue";

export default defineComponent({
    name: "Circles",
    data() {
        return {
            myCircles: [] as Circle[],
            API: new apiService(),
            isClicked: 0,
            authUserid: localStorage.getItem('id'),
            modalOpen: false,
            circleClicked: 0,
            selectedCircleId: 0,
            selectedCircleName: '',
            circleLeaved: false,
            circleCreated: false,
        }
    },
    methods: {
        leaveCircle() {
            this.API.leaveCircle(this.selectedCircleId)
                .then(response => {
                    if (response.status == 200) {
                        this.modalOpen = false;
                        this.circleLeaved = true;
                    }
                })
        },
        openDeleteModal(circleId: number, circleName: string) {
            this.selectedCircleId = circleId;
            this.selectedCircleName = circleName;
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false;
        },
    },
    components: {CircleCardContainer, CreateCircle, MainMenu}
})
</script>

<template>
    <main class="mainFrame">
        <div class="uppBox circles">
            <CircleCardContainer @deleteClicked="openDeleteModal"
                                 :circleLeaved="circleLeaved"
                                 :circleCreated="circleCreated"
                                 @circle-leaved="circleLeaved = false"
                                 @circleCreatedReceived="circleCreated = false"
            />
        </div>
        <div class="uppBoxRow">
            <CreateCircle @circleCreated="circleCreated = true"/>
            <MainMenu class="uppBox--pink flexMini"/>
        </div>


        <div class="uploadMainframe" v-if="modalOpen">
            <div class="uppBox uppBox--pink modalConfirm">
                {{ `Seguro que quieres irte del círculo ${selectedCircleName}?` }}
                <div>
                    <button @click="leaveCircle">Sí</button>
                    <button @click="closeModal">No</button>
                </div>
            </div>

        </div>

    </main>
</template>

<style scoped>

</style>