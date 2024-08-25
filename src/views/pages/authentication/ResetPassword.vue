<template>
    <div class="flex h-full justify-center items-center">
        <div class="self-center">
            <h1 class="text-center text-2xl">Réinitialiser le mot de passe</h1>
            <div class="w-full mx-auto">
                <div class="my-5">
                    <div class="flex flex-col">
                        <div class="my-5">
                            <label for="new-password" class="input input-bordered flex items-center gap-2">
                                <font-awesome-icon :icon="['fas', 'key']" />
                                <input :type="showPassword ? 'text' : 'password'" placeholder="Mot de passe"
                                    name="password" id="new-password" rules="required" class="grow" v-model="password"
                                    required />
                                <button @click="showPassword = !showPassword" size="sm" variant="outline-secondary"
                                    class="text-dark rounded-end">
                                    <font-awesome-icon :icon="['fas', 'eye-slash']" v-if="showPassword" />
                                    <font-awesome-icon :icon="['fas', 'eye']" v-else />
                                </button>
                            </label>
                            Temps pour trouver le mot de passe : <span class="text-error">{{
                                passwordStrength(password).value }}</span><a
                                href="https://patrowl.io/fr/le-tableau-de-la-resistance-des-mots-de-passe/"
                                target="_blank"></a>
                        </div>
                        <div class="my-5 text-center">
                            <button @submit.prevent @click="resetPassword()" class="btn btn-primary"
                                type="submit">Réinitialiser</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import passwordStrength from '@/utils/passwordStrength'

export default {
    data() {
        return {
            email: '',
            password: '',
            showPassword: false,
        };
    },
    methods: {
        resetPassword() {
            let token = this.$route.params.token;

            this.$store.dispatch('auth_store/resetPassword', { token: token, password: this.password })
                .then(() => {
                    this.$router.push({ name: 'login' });
                })
                .catch((error: any) => {
                    console.log('error', error);
                })
        }
    },
    setup() {
        return {
            passwordStrength
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>