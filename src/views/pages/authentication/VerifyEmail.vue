<template>
    <div class="flex h-full justify-center items-center">
        <div class="self-center my-auto">
            <div class="w-full mx-auto ">
                <div class="my-5">
                    <h1 class="text-center text-2xl">Vérifier votre Email</h1>
                    <button class="btn btn-primary m-5" @click="verifyEmail">Vérifier</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        verifyEmail() {
            // Get the token from the route
            let token = this.$route.params.token;

            // Send a request to the backend with the token in the route
            this.$store.dispatch('auth_store/verifyEmail', { token: token })
                .then((response: any) => {
                    this.$router.push({ name: "login" });
                })
                .catch((error: any) => {
                    console.error('An error occurred while verifying email:', error);
                });
        }
    }
};
</script>