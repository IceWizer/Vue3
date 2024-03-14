<template>
    <div class="">
        <div class="w-50 mx-auto">
            <h1 class="text-center">Création de compte</h1>
            <form>
                <div class="mt-2">
                    <label for="username">Name</label>
                    <BFormInput
                        type="text"
                        name="username"
                        id="username"
                        v-model="item.username"
                        :state="stateOn.username ? validators.username.isValidSync(item.username) : null"
                        autocomplete="username"
                        @focus="stateOn.username = true"
                    />
                    <p>
                        {{ getErrorMessage(validators.username, item.username) }}
                    </p>
                </div>
                <div class="mt-2">
                    <label for="email">Mail</label>
                    <BFormInput
                        type="text"
                        name="email"
                        id="email"
                        v-model="item.email"
                        :state="stateOn.email ? validators.email.isValidSync(item.email) : null"
                        autocomplete="email"
                        @focus="stateOn.email = true"
                    />
                    <p>
                        {{ getErrorMessage(validators.email, item.email) }}
                    </p>
                </div>
                <div class="mt-2">
                    <label for="password">Mot de passe</label>
                    <BFormGroup>
                        <BFormInput
                            :type="showPassword ? 'text' : 'password'"
                            name="password"
                            id="password"
                            rules="required"
                            v-model="item.password"
                            :state="stateOn.password ? validators.password.isValidSync(item.password) : null"
                            autocomplete="current-password"
                            @focus="stateOn.password = true"
                        />
                        <div>
                            <button @click="showPassword = !showPassword" size="sm" variant="outline-secondary" class="text-dark rounded-end">
                                <b-icon-eye v-if="showPassword" />
                                <b-icon-eye-slash v-else />
                            </button>
                        </div>
                        <p>
                            {{ getErrorMessage(validators.password, item.password) }}
                        </p>
                    </BFormGroup>
                </div>
                <div class="mt-2 mx-auto w-50">
                    <button class="w-100" type="submit" @click="registerCheck()">Créer ton compte</button>
                </div>
            </form>
            <div class="text-center mt-1">
                <router-link to="login">Déjà un compte</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { useModules } from "@store/utils";
import authStore from "@store/modules/authStore";
import {onUnmounted} from "vue";
import * as Yup from "yup";
import {BFormGroup, BFormInput} from "bootstrap-vue-next";

export default {
    name: "Register.vue",
  components: {BFormGroup, BFormInput},
  data() {
        return {
            item: {
                username: '',
                email: '',
                password: ''
            },
            stateOn: {
                username: false,
                email: false,
                password: false,
            },
            validators: {
                username: Yup.string()
                            .min(3, 'Username doit contenir au minimum 3 caractères')
                            .required('Le champ username est obligatoire'),
                email: Yup.string()
                            .email('L\'email doit être valide')
                            .required('Le champ email est obligatoire'),
                password: Yup.string()
                            .min(8, 'Le mot de passe doit avoir au minimum 8 caractères')
                            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/, 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)')
                            .required('Le champ password est obligatoire')
            },

            showPassword: false,

            errors: {}
        }
    },
    setup() {
        const modules = [
            {
                store: authStore,
            }
        ]
        const { umount } = useModules(modules);

        onUnmounted(() => {
            umount();
        });

        return {
            modules,
            Yup
        }
    },
    methods: {
        registerCheck() {
            let canRegister = true;
            for (const [key, value] of Object.entries(this.item)) {
                if (!this.stateOn[key] || this.getErrorMessage(this.validators[key], value) !== null) {
                    canRegister = false;
                }
            }

            if (canRegister)
                this.sendRegister();
            else
                console.log('can not register');
        },
        sendRegister() {
            this.$store.dispatch('auth_store/register', this.item)
                .then(() => {
                    this.$router.push({name: 'login'});
                });
        },
        getErrorMessage(validator, itemToValidate) {
            try {
                validator.validateSync(itemToValidate);
                return null;
            } catch (err) {
                return err.message;
            }
        }
    }
}
</script>

<style scoped>

</style>
