<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "UploadButton",
    data() {
        return {
            isClicked: 0,
            uploadIsOpen: false,
            animation: false
        }
    },
    methods: {
        buttonPress(buttonId: number) {
            this.isClicked= buttonId;
            this.$emit('buttonPressed', buttonId);

            if(buttonId == 1) {
                this.uploadIsOpen= true
                setTimeout(() => {
                    this.animation= true;
                }, 1);
            }

            setTimeout(() => {
                this.isClicked= 0;
            }, 300);
        },
        closeMenu() {
            this.animation= false;
            setTimeout(() => {
                this.uploadIsOpen= false;
            }, 350);
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
                 :class="{ 'uploadMenu--animation': animation }"
            >
                <div class="uppBox uppBox--pink uploadImage"
                     :class="{ 'mainButton--onTap': isClicked == 2 }"
                     @click="buttonPress(2)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                        <path d="M0 0v8h8v-8h-8zm1 1h6v3l-1-1-1 1 2 2v1h-1l-4-4-1 1v-3z" />
                    </svg>
                </div>
                <div class="uppBox uppBox--blue uploadVideo"
                     :class="{ 'mainButton--onTap': isClicked == 3 }"
                     @click="buttonPress(3)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                        <path d="M.5 0c-.28 0-.5.23-.5.5v4c0 .28.23.5.5.5h5c.28 0 .5-.22.5-.5v-1.5l1 1h1v-3h-1l-1 1v-1.5c0-.28-.22-.5-.5-.5h-5z" transform="translate(0 1)" />
                    </svg>
                </div>
                <div class="uppBox uppBox--yellow uploadAudio"
                     :class="{ 'mainButton--onTap': isClicked == 4 }"
                     @click="buttonPress(4)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                        <path d="M2.91-.03a1 1 0 0 0-.13.03 1 1 0 0 0-.78 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1.09-1.03zm-2.56 2.03a.5.5 0 0 0-.34.5v.5c0 1.48 1.09 2.69 2.5 2.94v1.06h-.5c-.55 0-1 .45-1 1h4.01c0-.55-.45-1-1-1h-.5v-1.06c1.41-.24 2.5-1.46 2.5-2.94v-.5a.5.5 0 1 0-1 0v.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2v-.5a.5.5 0 0 0-.59-.5.5.5 0 0 0-.06 0z"
                              transform="translate(1)" />
                    </svg>
                </div>
                <div class="uppBox uppBox--black uploadText"
                     :class="{ 'mainButton--onTap': isClicked == 5 }"
                     @click="buttonPress(5)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                        <path d="M0 0v3h2c0 1.11-.89 2-2 2v1c1.65 0 3-1.35 3-3v-3h-3zm5 0v3h2c0 1.11-.89 2-2 2v1c1.65 0 3-1.35 3-3v-3h-3z" transform="translate(0 1)" fill="currentColor" />
                    </svg>
                </div>
            </div>











</template>