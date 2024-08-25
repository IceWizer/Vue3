<template>
    <div class="flex h-full justify-center items-center">
        <div class="self-center my-auto">
            <h1 class="text-center text-2xl">Connexion</h1>
            <div class="w-full mx-auto ">
                <div class="my-5">
                    <label class="input input-bordered flex items-center gap-2" for="email">
                        <font-awesome-icon :icon="['fas', 'user']" />
                        <input class="grow" type="text" placeholder="Email" name="email" id="email" v-model="item.email"
                            :state="stateOn.email ? validators.email.isValidSync(item.email) : null"
                            autocomplete="email" @focus="stateOn.email = true" required />
                    </label>
                    <p v-if="stateOn.email && !validators.email.isValidSync(item.email)">
                        {{ getErrorMessage(validators.email, item.email) }}
                    </p>
                </div>
                <div class="my-5">
                    <label for="password" class="input input-bordered flex items-center gap-2">
                        <font-awesome-icon :icon="['fas', 'key']" />
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Mot de passe" name="password"
                            id="password" rules="required" class="grow" v-model="item.password"
                            :state="stateOn.password ? validators.password.isValidSync(item.password) : null"
                            autocomplete="current-password" @focus="stateOn.password = true" required />
                        <button @click="showPassword = !showPassword" size="sm" variant="outline-secondary"
                            class="text-dark rounded-end">
                            <font-awesome-icon :icon="['fas', 'eye-slash']" v-if="showPassword" />
                            <font-awesome-icon :icon="['fas', 'eye']" v-else />
                        </button>
                    </label>
                    <p>
                        {{ getErrorMessage(validators.password, item.password) }}
                    </p>
                </div>
            </div>
            <div class="text-bg-danger my-5 text-center rounded p-1" v-if="dataSent">
                {{ errorMessage }}
            </div>
            <div class="my-5 mx-auto text-center">
                <button class="btn btn-primary" type="submit" @click="loginCheck()">Connexion</button>
            </div>
            <div class="text-center mt-1">
                <p>
                    Tu n'as pas de compte ?
                    <router-link to="register" class="text-primary"> Créer un compte </router-link>
                </p>
                <p>
                    Mot de passe
                    <router-link to="forgotten-password" class="text-primary"> oublié </router-link> ?
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import connection from "@/auth/utils/connection";
import * as Yup from "yup";

interface Data {
    item: {
        email: string;
        password: string;
    };
    stateOn: {
        email: boolean;
        password: boolean;
        [key: string]: boolean; // Add index signature
    };
    validators: {
        email: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, "">;
        password: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, "">;
        [x: string]: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, "">; // Add index signature
    };
    showPassword: boolean;
    dataSent: boolean;
    errorMessage: string;

}

export default {
    name: "Log-in",
    data(): Data {
        return {
            item: {
                email: '',
                password: ''
            },
            stateOn: {
                email: false,
                password: false,
            },
            validators: {
                email: Yup.string(),
                password: Yup.string(),
            },

            showPassword: false,
            dataSent: false,
            errorMessage: "L'identifiant ou le mot de passe est incorrect",
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
                .then((response: any) => {
                    console.log()
                    connection.login(response.token);
                    this.$router.push({ name: 'dashboard' });
                })
                .catch((error: any) => {
                    console.log(error.response.status);
                    switch (error.response.status) {
                        case 401:
                            this.errorMessage = "L'identifiant ou le mot de passe est incorrect";
                            break;
                        case 403:
                            this.errorMessage = "L'email n'est pas vérifié";
                            break;
                        default:
                            this.errorMessage = "L'identifiant ou le mot de passe est incorrect";
                            break;
                    }
                })
                .finally(() => {
                    this.dataSent = true;
                });
        },
        getErrorMessage(validator: any, itemToValidate: any) {
            try {
                validator.validateSync(itemToValidate);
                return null;
            } catch (err: any) {
                return err.message;
            }
        }
    }
}
</script>

<style scoped></style>
