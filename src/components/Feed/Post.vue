<template>
    <div class="post__height">
        <div ref="card"
             class="post__height"
             :style="{ transform: `translateY(${offset * 100}%)` }"
        >
            <div class="uppBox scrollableUppbox uppBox--pink post"
            >
                <div class="post__iconBox">
                    <i class="material-icons">pause</i>
                </div>
                <div class="post__authorData">
                    <div>Foto</div>
                    <h1>Tumbalaka</h1>
                </div>
                <div class="post__content">
                    La vida es una montaña rusa llena de altibajos. A veces estamos en la cima
                    del mundo, sintiéndonos invencibles, y otras veces estamos en lo más
                    bajo, sintiéndonos desesperados. Pero lo importante es recordar que las
                    cosas.
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Hammer from 'hammerjs'
import { ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'

export default {
    setup () {

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

                    if (e.deltaY > 200 || e.velocityY > 0.4) {
                        console.log("holiiii")
                    }
                }
            })
        }

        onMounted(setupHammer)

        const blurCSS = computed(() => {
            console.log("holiiii")
        })

        return {
            card,
            offset,
            isDismissing,
            blurCSS
        }
    }
}
</script>