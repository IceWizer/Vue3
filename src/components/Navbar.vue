<template>
    <header>
        <div class="navbar bg-base-100">
            <div class="navbar bg-base-100">
                <div class="flex-1">
                    <RouterLink to="/"><font-awesome-icon :icon="['fas', 'fingerprint']" size="2xl"
                            class=" text-primary" />
                    </RouterLink>
                </div>
                <div class="flex-none">
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                            <div class="w-10 rounded-full">
                                <font-awesome-icon :icon="['fas', 'bars']" size="xl" />
                            </div>
                        </div>
                        <ul tabindex="0"
                            class="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <div class="m-3">
                                <span class=""><font-awesome-icon :icon="['fas', 'user']" /> {{ email }}</span>
                            </div>
                            <li>
                                <RouterLink to="/">
                                    <font-awesome-icon :icon="['fas', 'house']" />Accueil
                                </RouterLink>
                            </li>
                            <li v-if="isAdmin">
                                <RouterLink :to="{ name: 'admin-passwords' }">
                                    <font-awesome-icon :icon="['fas', 'key']" />Liste des mots de passe
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/logout">
                                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" />Déconnexion
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import utils from '@/auth/utils';

export default {
    name: 'NavBar',
    setup() {
        const isAdmin: Boolean = utils.useUserData.isUserAdmin();
        const email: String = utils.useUserData.getUserData().email;
        return { isAdmin, email };
    },
};
</script>