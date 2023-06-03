<script lang="ts">
export default {
    data() {
        return {
            isDragging: false,
            startY: 0,
            offset: 0,
            threshold: 400,
        };
    },
    methods: {
        handleMouseDown(event) {
            this.isDragging = true;
            this.startY = event.clientY;
        },
        handleMouseMove(event) {
            if (this.isDragging) {
                const deltaY = event.clientY - this.startY;
                console.log(deltaY);
                this.offset = deltaY / this.$refs.post.clientHeight;
            }
        },
        handleMouseUp() {
            if (this.isDragging) {
                if (Math.abs(this.offset) >= this.threshold) {
                    // Se superó el umbral, llamar a la función
                    this.handleThresholdExceeded();
                } else {
                    // No se superó el umbral, volver a la posición inicial
                    this.offset = 0;
                }
                this.isDragging = false;
            }
        },
        handleThresholdExceeded() {
            if (this.offset > 0) {
                // Desplazamiento hacia abajo superó el umbral positivo
                console.log('Desplazamiento hacia abajo superó el umbral');
                // Llamar a la función correspondiente
            } else {
                // Desplazamiento hacia arriba superó el umbral negativo
                console.log('Desplazamiento hacia arriba superó el umbral');
                // Llamar a la función correspondiente
            }
        },
    },
};
</script>

<template>
         <div class="uppBox scrollableUppbox uppBox--pink post"
              ref="post"
              :style="{ transform: `translateY(${offset * 100}%)` }"
              @mousedown="handleMouseDown"
              @mousemove="handleMouseMove"
              @mouseup="handleMouseUp"
              @mouseleave="handleMouseUp"
         >
             <div class="post__iconBox">
                <i class="material-icons">pause</i>
             </div>
             <div class="post__authorData">
                 <div>Foto</div>
                 <h1>Tumbalaka</h1>
             </div>
             <div class="post__content">
                 La vida es una montaña rusa llena de altibajos. A veces estamos en la cima del mundo, sintiéndonos invencibles,
                 y otras veces estamos en lo más bajo, sintiéndonos desesperados. Pero lo importante es recordar que las cosas.
             </div>
         </div>
</template>