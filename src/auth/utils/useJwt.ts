const isJwtExpired = (jwt: string | null = getJwt()): boolean => {
    if (jwt === null) {
        return true;
    }
    const jwtParts: string[] = jwt.split('.');
    const payload: any = JSON.parse(atob(jwtParts[1]));
    const expirationDate: Date = new Date(payload.exp * 1000);
    return expirationDate < new Date();
}

const getData = (jwt: string | null = getJwt()): string | null => {
    if (jwt === null) {
        return null;
    }
    const jwtParts: string[] = jwt.split('.');
    return JSON.parse(atob(jwtParts[1]));
}

const getJwt = (): string | null => {
    return localStorage.getItem('token');
}

const setJwt = (jwt: string): void => {
    localStorage.setItem('token', jwt);
}

const removeJwt = (): void => {
    localStorage.removeItem('token');
}

export {
    getData,
    getJwt, isJwtExpired, removeJwt, setJwt
};
