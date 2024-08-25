
import { apiRequest } from "@/store/axios";

export default ({
    state: {
        user: null,
    },
    mutations: {

    },
    actions: {
        register({ commit }: any, payload: any) {
            return apiRequest(
                'auth/register',
                'POST',
                null,
                payload
            )
        },
        login({ commit }: any, payload: any) {
            return apiRequest(
                'auth/login',
                'POST',
                null,
                payload
            )
        },
        verifyEmail({ commit }: any, payload: any) {
            return apiRequest(
                `auth/verify-email/${payload.token}`,
                'POST',
                null,
                null
            )
        },
        forgotPassword({ commit }: any, payload: any) {
            return apiRequest(
                `auth/forgot-password`,
                'POST',
                null,
                payload
            )
        },
        resetPassword({ commit }: any, payload: any) {
            return apiRequest(
                `auth/reset-password/${payload.token}`,
                'POST',
                null,
                { password: payload.password }
            )
        },
        logout({ commit }: any) {
            return apiRequest(
                'auth/logout',
                'POST',
                null,
                null
            )
        }
    },
    getters: {
        getUser(state: { user: any; }) {
            return state.user;
        }
    },
    namespaced: true,
})
