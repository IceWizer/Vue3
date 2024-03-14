import { getData, removeJwt, setJwt } from "@/auth/utils/useJwt";
import { removeUserData, setUserData } from "@/auth/utils/useUserData";

const login = (jwt: string): void => {
    setJwt(jwt);
    setUserData(getData());
}

const logout = (): void => {
    removeJwt();
    removeUserData();
}

export {
    login,
    logout
};
