<script lang="ts">
export default {
    mounted() {
        document.body.style.backgroundColor = "#F4E401"; // Color de fondo inicial
    },
    watch: {
        $route(to) {
            // Cambiar el color de fondo según la ruta
            if (to.path === "/") {
                document.body.style.backgroundColor = "#F4E401";
            } else if (to.path === "/circles") {
                document.body.style.backgroundColor = "#06B1B3";
            } else {
                document.body.style.backgroundColor = "#F4E401";
            }
        },
    },
};
</script>

<template>
  <router-view/>
</template>

<style>
html {
    overflow: hidden;
    overscroll-behavior: none;
}
</style>
