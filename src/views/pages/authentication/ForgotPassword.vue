<template>
    <div class="flex justify-center items-center h-full">
        <div class="self-center my-auto" v-if="emailSended === false">
            <h1 class="text-center text-2xl">Mot de passe oublié</h1>
            <div class="w-full mx-auto ">
                <div class="my-5">
                    <form class="w-full text-center" @submit.prevent="submitForm">
                        <label for="email" class="input input-bordered flex items-center gap-2">
                            <font-awesome-icon :icon="['fas', 'envelope']" />
                            <input type="email" placeholder="Email" id="email" v-model="email" required>
                        </label>
                        <button class="btn btn-primary m-5" type="submit">Envoyer</button>
                    </form>
                </div>
            </div>
        </div>
        <p v-if="emailSended">Un email vous sera envoyé afin de changer votre mot de passe</p>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            email: '',
            emailSended: false,
        };
    },
    methods: {
        submitForm() {
            this.$store.dispatch('auth_store/forgotPassword', { email: this.email })
                .then(() => {
                    this.emailSended = true;
                });
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>