<template>
    <div class="w-100 my-auto">
        <h1 class="text-center">Connexion</h1>
        <div class="w-50 mx-auto">
            <div class="mt-2">
                <label for="username">Name</label>
                <BFormInput type="text" name="username" id="username" v-model="item.username"
                    :state="stateOn.username ? validators.username.isValidSync(item.username) : null"
                    autocomplete="username" @focus="stateOn.username = true" />
                <p v-if="stateOn.username && !validators.username.isValidSync(item.username)">
                    {{ getErrorMessage(validators.username, item.username) }}
                </p>
            </div>
            <div class="mt-2">
                <label for="password">Mot de passe</label>
                <BFormGroup>
                    <BFormInput :type="showPassword ? 'text' : 'password'" name="password" id="password"
                        rules="required" v-model="item.password"
                        :state="stateOn.password ? validators.password.isValidSync(item.password) : null"
                        autocomplete="current-password" @focus="stateOn.password = true" />
                    <div>
                        <button @click="showPassword = !showPassword" size="sm" variant="outline-secondary"
                            class="text-dark rounded-end">
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
                <button class="w-100" type="submit" @click="loginCheck()">Connecte toi</button>
            </div>
            <div class="text-bg-danger mt-2 text-center rounded p-1" v-if="dataSent">
                L'identifiant ou le mot de passe est incorrect
            </div>
        </div>
        <div class="text-center mt-1">
            <router-link to="register">Tu n'as pas de compte. Créer un compte</router-link>
        </div>
    </div>
</template>

<script>
import { login } from "@/auth/utils/connection";
import { BFormGroup, BFormInput } from "bootstrap-vue-next";
import * as Yup from "yup";

export default {
    name: "Log-in",
    components: {
        BFormGroup,
        BFormInput
    },
    data() {
        return {
            item: {
                username: '',
                password: ''
            },
            stateOn: {
                username: false,
                password: false,
            },
            validators: {
                username: Yup.string().min(3, 'Username doit contenir au minimum 3 caractères').required('Le champ username est obligatoire'),
                password: Yup.string().required('Le champ password est obligatoire'),
            },

            showPassword: false,
            dataSent: false,
        }
    },
    setup() {
        return {
            Yup,
        }
    },
    methods: {
        loginCheck() {
            let canSend = true;
            for (const [key, value] of Object.entries(this.item)) {
                if (!this.stateOn[key] || this.getErrorMessage(this.validators[key], value) !== null) {
                    canSend = false;
                }
            }

            if (canSend)
                this.sendLogin();
            else
                this.dataSent = true;
        },
        sendLogin() {
            this.$store.dispatch('auth_store/login', this.item)
                .then((response) => {
                    console.log()
                    login(response.token);
                    this.$router.push({ name: 'dashboard' });
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.dataSent = true;
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

<style scoped></style>
