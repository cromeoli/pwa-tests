<template>
    <div class="post__height">
        <div ref="card"
             class="post__height"
             :style="{ transform: `translateY(${offset * 100}%)`, opacity: opacity }"
        >
            <div class="uppBox scrollableUppbox uppBox--pink post"
            >
                <div class="post__iconBox">
                    <i class="material-icons">pause</i>
                </div>
                <div class="post__authorData">
                    <img :src="currentPostInfo.user.avatar" alt="">
                    <h1> {{ currentPostInfo.user.nickname }} </h1>
                </div>
                <div class="post__content">
                    <div v-if="currentPostInfo?.type === 1">{{ currentPostInfo.post_content }}</div>
                </div>
                <img class="post__image"
                     v-if="currentPostInfo.type === 2"
                     :src="imagepath + currentPostInfo?.post_content" alt="">
            </div>
        </div>
        <div :style="{ opacity: opacityUpp }"
             class="post__uppArrow"
             :class="{ 'uppArrow__flex': isDismissing }"
        >
            <svg width="266" height="342" viewBox="0 0 266 342" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g style="mix-blend-mode:multiply">
                    <path d="M262.141 142.576L151.32 17.4697C149.949 15.9211 148.282 14.6846 146.425 13.8388C144.568 12.993 142.562 12.5563 140.534 12.5563C138.506 12.5563 136.499 12.993 134.643 13.8388C132.786 14.6846 131.119 15.9211 129.747 17.4697L18.9268 142.576C17.0036 144.747 15.7314 147.451 15.2656 150.359C14.7997 153.266 15.1602 156.251 16.3031 158.95C17.446 161.648 19.3219 163.944 21.7021 165.557C24.0822 167.169 26.8638 168.029 29.7076 168.032H62.4029V322.937C62.4029 327.967 64.331 332.791 67.7632 336.348C71.1954 339.905 75.8504 341.903 80.7042 341.903H200.363C205.217 341.903 209.872 339.905 213.304 336.348C216.737 332.791 218.665 327.967 218.665 322.937V168.032H251.36C254.204 168.029 256.985 167.169 259.366 165.557C261.746 163.944 263.622 161.648 264.765 158.95C265.907 156.251 266.268 153.266 265.802 150.359C265.336 147.451 264.064 144.747 262.141 142.576Z" fill="#F560B8"/>
                </g>
                <path d="M243.627 133.073L243.627 133.073C244.961 134.579 245.859 136.473 246.189 138.531C246.518 140.589 246.262 142.699 245.458 144.598C244.654 146.496 243.346 148.084 241.715 149.189C240.087 150.292 238.202 150.87 236.288 150.872H203.597H198.993V155.476V310.38C198.993 314.242 197.512 317.913 194.924 320.595C192.341 323.271 188.874 324.743 185.296 324.743H65.6367C62.058 324.743 58.5912 323.271 56.0087 320.595C53.4209 317.913 51.9393 314.242 51.9393 310.38V155.476V150.872H47.3353H14.6442C12.7305 150.87 10.8451 150.292 9.21701 149.189C7.58693 148.084 6.27861 146.496 5.47493 144.598C4.67075 142.699 4.41414 140.589 4.74395 138.531C5.07369 136.473 5.97138 134.579 7.3054 133.073L7.30558 133.073L118.126 7.96619L118.126 7.96582C119.076 6.89295 120.222 6.04711 121.483 5.47233C122.745 4.89779 124.1 4.60396 125.466 4.60396C126.832 4.60396 128.188 4.89779 129.449 5.47233C130.711 6.04711 131.856 6.89294 132.806 7.96582L132.807 7.9662L243.627 133.073Z" fill="#F5F5F5" stroke="black" stroke-width="9.20793"/>
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-nocheck
import Hammer from 'hammerjs'
import {ref} from '@vue/reactivity'
import {computed, onMounted} from '@vue/runtime-core'
import {_Post} from "../../models/Posts.ts";
import {environment} from "../../enviroments/enviroment.ts";

export default {
    props: {
        currentPostInfo: {
            type: Object as () => _Post,
            default: false
        }
    },
    data() {
        return {
            opacityUpp: 1,
            isDismissing: false,
            offset: 0,
            card: null,
            currentUserInfo: {},
            imagepath: environment.IMAGE
        }
    },
    emits: ['changePost'],
    setup (props,{emit}) {

        const card = ref<HTMLElement>()
        const offset = ref(0)
        const isDismissing = ref(false)

        const setupHammer = () => {
            if (!card.value) {
                throw new Error('Missing swiper element')
            }

            const swiperManager = new Hammer.Manager(card.value as EventTarget)

            swiperManager.add(new Hammer.Pan({
                threshold: 0,
                pointers: 0,
                direction: Hammer.DIRECTION_VERTICAL
            }))

            swiperManager.on('pan', (e) => {
                if (isDismissing.value) {
                    offset.value = e.deltaY / card.value!.clientHeight
                }
            })

            swiperManager.on('panstart', (e) => {


                isDismissing.value = e.offsetDirection === Hammer.DIRECTION_DOWN ||
                    e.offsetDirection === Hammer.DIRECTION_UP
            })

            swiperManager.on('panend', (e) => {
                if (isDismissing.value) {
                    isDismissing.value = false
                    offset.value = 0

                    if (e.deltaY > 350 || e.velocityY > 0.4) {
                        setTimeout(() => {
                            emit('changePost')
                        }, 300)
                    }
                }
            })
        }

        onMounted(setupHammer)


        // Efectivamente, si ves este código, podrás darte cuenta de que es
        // absurdo, pero por algún motivo, si se elimina, la aplicación muere.
        // Así que aquí se quedará. Este es su lugar.
        const blurCSS = computed(() => {
            console.log("holiiii")
        })

        const opacity = computed(() => {
            const opacityRange = 0.1; // Rango de opacidad deseado (0 a 1)
            const threshold = 0.05; // Umbral para comenzar a aplicar cambios de opacidad
            const position = Math.abs(offset.value);

            if (position <= threshold) {
                return 1; // Opacidad máxima dentro del umbral
            } else {
                const opacityValue = 1 - (position - threshold) / (1 - threshold);
                return opacityRange + opacityValue * (1 - opacityRange);
            }
        });

        const opacityUpp = computed(() => {
            const threshold = 0.01; // Umbral para comenzar a aplicar cambios de opacidad
            const position = Math.abs(offset.value);
            if (offset.value < 0) {
                if (position <= threshold) {
                    return 0; // Opacidad mínima dentro del umbral
                } else {
                    return (position - threshold) / (1 - threshold);
                }
            }else{
                return 0;
            }
        });

        return {
            card,
            offset,
            isDismissing,
            blurCSS,
            opacity,
            opacityUpp,
        }
    }
}
</script>