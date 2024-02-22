import {getJwt, isJwtExpired} from "@/auth/utils/useJwt";

const isUserLoggedIn = () => {
    const user = getUserData();

    return !!user && !isJwtExpired();
}

const getUserData = (isInRecursive = false) => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    if (!isInRecursive) {
        setUserData(getJwt());
        return getUserData(true)
    }
    return null;
}

const setUserData = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

const removeUserData = () => {
    localStorage.removeItem('user');
}

const isUserAdmin = () => {
    const user = getUserData();
    return user?.roles && user.roles.includes('ADMIN_ROLE');
}

export {
    isUserLoggedIn,
    getUserData,
    setUserData,
    removeUserData,
    isUserAdmin
}