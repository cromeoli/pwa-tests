<template>
    <div class="mainFrame">
        <div>Actividad</div>
        <Post />
        <h2 class="uppBox mainButton uppBox--pink justified">
            Global
        </h2>
        <Register />
    </div>
</template>

<script lang="ts">
import Post from "./Post.vue";
import Register from "./RegisterButtons.vue";

export default {
    components: {
        Post,
        Register
    },
    data() {
        return {
            registerToggled: false,
        };
    }
};
</script>