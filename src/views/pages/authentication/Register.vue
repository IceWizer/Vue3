<template>
    <div class="flex h-full justify-center items-center">
        <div class="self-center">
            <h1 class="text-center text-2xl">Inscription</h1>
            <div class="w-full mx-auto">
                <div class="my-5">
                    <label class="input input-bordered flex items-center gap-2" for="email">
                        <font-awesome-icon :icon="['fas', 'envelope']" />
                        <input class="grow" type="text" placeholder="Email" name="email" id="email" v-model="item.email"
                            :state="stateOn.email ? validators.email.isValidSync(item.email) : null"
                            autocomplete="email" @focus="stateOn.email = true" required />
                    </label>
                    <p>
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
                    Temps pour trouver le mot de passe : <span class="text-error">{{
                        passwordStrength(item.password ?? "").value }}</span><a
                        href="https://patrowl.io/fr/le-tableau-de-la-resistance-des-mots-de-passe/" target="_blank"></a>
                    <p>
                        {{ getErrorMessage(validators.password, item.password) }}
                    </p>
                </div>
            </div>
            <div class="my-5 mx-auto w-50 text-center">
                <button class="w-100 btn btn-primary" type="submit" @submit.prevent @click="registerCheck()">Créer ton
                    compte</button>
            </div>
            <div class="text-center mt-1">
                <router-link to="login">J'ai déjà un compte</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as Yup from "yup";
import passwordStrength from '@/utils/passwordStrength';
import User from "@/models/user";

interface Data {
    item: User;
    stateOn: {
        email: boolean;
        password: boolean;
        [key: string]: boolean; // Add index signature
    };
    validators: {
        email: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, "">;
        password: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, "">;
        [key: string]: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, "">; // Add index signature
    };
    showPassword: boolean;
    errors: Record<string, string>;
}

export default {
    name: "Auth_Register",
    data(): Data {
        return {
            item: new User(),
            stateOn: {
                email: false,
                password: false,
            },
            validators: {
                email: Yup.string(),
                password: Yup.string(),
            },

            showPassword: false,

            errors: {}
        }
    },
    setup() {
        return {
            Yup,
            passwordStrength
        }
    },
    methods: {
        registerCheck() {
            let canRegister = true;
            // for (const [key, value] of Object.entries(this.item)) {
            //     if (!this.stateOn[key] || this.getErrorMessage(this.validators[key], value) !== null) {
            //         canRegister = false;
            //     }
            // }

            if (canRegister)
                this.sendRegister();
            else
                console.log('can not register');
        },
        sendRegister() {
            this.$store.dispatch('auth_store/register', this.item)
                .then(() => {
                    this.$router.push({ name: 'login' });
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
    },
    mounted() {
        this.item.email = "";
        this.item.password = "";
    }
}
</script>

<style scoped></style>
