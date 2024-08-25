<template class="my-auto">
    <div id="app">
        <Navbar v-if="showNavbar" />
        <RouterView class=" my-auto" />
    </div>
</template>

<style scoped></style>

<script lang="ts">
import { RouterView } from 'vue-router';

import Navbar from "./components/Navbar.vue";

export default {
    components: {
        Navbar,
        RouterView
    },
    computed: {
        showNavbar() {
            // Liste des chemins où la navbar ne doit pas être affichée
            // const noNavbarRoutes = ['/login', '/register', '/forgotten-password', '/verify-email'];
            return this.$route.meta.layout === "default";
            // return !noNavbarRoutes.includes(this.$route.path);
        }
    }
};
</script>