import useJwt from "@/auth/utils/useJwt";
import useUserData from "@/auth/utils/useUserData";

const login = (jwt: string): void => {
    useJwt.setJwt(jwt);
    useUserData.setUserData(useJwt.getData());
}

const logout = (): void => {
    useJwt.removeJwt();
    useUserData.removeUserData();
}

export default {
    login,
    logout
};
