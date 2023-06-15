<script lang="ts">
// @ts-nocheck
import {defineComponent} from 'vue'
import {Circle} from "../../models/Circles.ts";
import {apiService} from "../../services/apiService.ts";

export default defineComponent({
    name: "UploadButton",
    props: {
        currentCircle: {
            type: Object as () => Circle,
            required: false,
        },
    },
    emits: ['contentUpload', 'buttonPressed'],
    data() {
        return {
            isClicked: 0,
            uploadIsOpen: false,
            animation: false,
            expandedMenu: [false,false,false,false],
            postContent: "",
            success: false,
            imageSuccess: false,
            noImage: false,
            API: new apiService()
        }
    },
    methods: {
        buttonPress(buttonId: number) {
            this.isClicked= buttonId;
            this.$emit('buttonPressed', buttonId);
            this.expandedMenu = [false,false,false,false]
            this.expandedMenu[buttonId] = true

            if(buttonId == 1) {
                this.openUploadMenu()
            }

            setTimeout(() => {
                this.isClicked= 0;
            }, 300);
        },
        openUploadMenu(){
            this.uploadIsOpen= true
            setTimeout(() => {
                this.animation= true;
            }, 1);
        },
        closeMenu() {
            this.animation= false;
            setTimeout(() => {
                this.uploadIsOpen= false;
            }, 350);
        },
        sendPost() {
            this.API.sendPost(this.postContent, 1,this.currentCircle?.id)
                .then(response => {
                    if(response.status === 200){
                        this.postContent = ""
                        this.success = true
                        this.$emit('contentUpload')

                        setTimeout(() => {
                            this.success = false
                            this.closeMenu()
                        }, 1000);
                    }
                })
        },
        uploadImage(){
            const fileInput = this.$refs.imageFile;
            const file = fileInput.files[0] as File;

            console.log(file)

            if (file) {
                const formData = new FormData();
                formData.append('image', file);

                this.API.uploadImage(formData, this.currentCircle?.id)
                    .then(response => {
                        if (response.status === 200) {
                            console.log(response.data)
                            this.imageSuccess = true
                            setTimeout(() => {
                                this.imageSuccess = false
                                this.$emit('contentUpload')
                                this.closeMenu()
                            }, 1000);

                        }
                    })
                    .catch(error => {
                        console.error('Error al enviar la solicitud:', error);
                    });
            } else {
                console.log('No se ha seleccionado ningún archivo.');
            }
        }
    }
}
)
</script>

<template>
  <div class="uppBox mainButton uppBox--white navButton navButton--Upload"
          :class="{ 'mainButton--onTap': isClicked == 1, '.uploadMenu--animation': animation }"
          @click="buttonPress(1)"
  >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
          <path d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z" />
      </svg>
  </div>

        <div class="uploadMainframe" v-if="uploadIsOpen" @click="closeMenu">
        </div>
            <div class="uploadMenu"
                 v-if="uploadIsOpen"
                 :class="{ 'uploadMenu--animation': animation,
                 'tallerUploadMenu': expandedMenu[2] || expandedMenu[3] || expandedMenu[4] || expandedMenu[5]}"
            >
                <div class="uppBox uppBox--pink uploadImage"
                     :class="{ 'mainButton--onTap': isClicked == 2,
                                'expandMenu': expandedMenu[2] }"
                     @click="buttonPress(2)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                        <path d="M0 0v8h8v-8h-8zm1 1h6v3l-1-1-1 1 2 2v1h-1l-4-4-1 1v-3z" />
                    </svg>
                    <div class="uploadMenu__Wrapper" v-if="expandedMenu[2]">
                        <input type="file" id="imageFile" ref="imageFile">
                        <label class="material-icons" for="imageFile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                                <path d="M0 0v1h8v-1h-8zm4 2l-3 3h2v3h2v-3h2l-3-3z" fill="currentColor" />
                            </svg>
                        </label>
                        <button class="uploadMenu__confirmButton"
                                @click="uploadImage">
                            {{imageSuccess ? 'Imagen subida' : 'Subir imagen'}}
                        </button>
                    </div>
                </div>
                <div class="uppBox uppBox--blue uploadVideo"
                     :class="{ 'mainButton--onTap': isClicked == 3,
                                'expandMenu': expandedMenu[3]}"
                     @click="buttonPress(3)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                        <path d="M.5 0c-.28 0-.5.23-.5.5v4c0 .28.23.5.5.5h5c.28 0 .5-.22.5-.5v-1.5l1 1h1v-3h-1l-1 1v-1.5c0-.28-.22-.5-.5-.5h-5z" transform="translate(0 1)" />
                    </svg>
                </div>
                <div class="uppBox uppBox--yellow uploadAudio"
                     :class="{ 'mainButton--onTap': isClicked == 4,
                                'expandMenu': expandedMenu[4]}"
                     @click="buttonPress(4)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                        <path d="M2.91-.03a1 1 0 0 0-.13.03 1 1 0 0 0-.78 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1.09-1.03zm-2.56 2.03a.5.5 0 0 0-.34.5v.5c0 1.48 1.09 2.69 2.5 2.94v1.06h-.5c-.55 0-1 .45-1 1h4.01c0-.55-.45-1-1-1h-.5v-1.06c1.41-.24 2.5-1.46 2.5-2.94v-.5a.5.5 0 1 0-1 0v.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2v-.5a.5.5 0 0 0-.59-.5.5.5 0 0 0-.06 0z"
                              transform="translate(1)" />
                    </svg>
                </div>
                <div class="uppBox uppBox--black uploadText"
                     :class="{ 'mainButton--onTap': isClicked == 5,
                                'expandMenu': expandedMenu[5]}"
                     @click="buttonPress(5)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                        <path d="M0 0v3h2c0 1.11-.89 2-2 2v1c1.65 0 3-1.35 3-3v-3h-3zm5 0v3h2c0 1.11-.89 2-2 2v1c1.65 0 3-1.35 3-3v-3h-3z" transform="translate(0 1)" fill="currentColor" />
                    </svg>
                    <textarea class="uploadText__textArea"
                              v-if="expandedMenu[5]"
                              v-model="postContent"
                    ></textarea>
                    <button v-if="expandedMenu[5]" @click="sendPost">
                        {{ success ? `Post sent` : `Post in ${currentCircle?.name} Circle` }}
                    </button>
                </div>
            </div>

</template>