<script lang="ts">
import Hammer from 'hammerjs';

export default {
    data() {
        return {
            offset: 0,
            threshold: 0,
            isDragging: false,
        };
    },
    mounted() {
        this.setupHammer();
    },
    methods: {
        setupHammer() {
            const hammertime = new Hammer.Manager(this.$refs.post);

            hammertime.add(
                new Hammer.Pan({
                    threshold: this.threshold,
                    pointers: 0,
                    direction: Hammer.DIRECTION_VERTICAL,
                })
            );

            hammertime.on('pan', (event) => {
                this.offset = event.deltaY / this.$refs.post!.clientHeight;

                console.log(this.$refs.post!.clientHeight)
                console.log(this.offset);
            });

            hammertime.on('panstart', (event) => {
                this.isDragging =
                    event.offsetDirection === Hammer.DIRECTION_DOWN ||
                    event.offsetDirection === Hammer.DIRECTION_UP;
            });

            hammertime.on('panend', (event) => {
                this.isDragging = false;

                if (event.deltaY > 200 || event.velocityY > 0.4) {
                    this.offset = 1;
                }
                this.offset = 0;

            });
        },
    },
};
</script>

<template>
        <div
                class="uppBox scrollableUppbox uppBox--pink post"
                ref="post"
                :class="{'slide-transition': isDragging}"
                :style="{ transform: `translateY(${offset * 100}%)` }"
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
</template>
