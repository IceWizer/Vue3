const isJwtExpired = (jwt: string = getJwt()): boolean => {
    const jwtParts: string[] = jwt.split('.');
    const payload: any = JSON.parse(atob(jwtParts[1]));
    const expirationDate: Date = new Date(payload.exp * 1000);
    return expirationDate < new Date();
}

const getData = (jwt: string = getJwt()) => {
    const jwtParts: string[] = jwt.split('.');
    return JSON.parse(atob(jwtParts[1]));
}

const getJwt = (): string => {
    return localStorage.getItem('token');
}

const setJwt = (jwt): void => {
    localStorage.setItem('token', jwt);
}

const removeJwt = (): void => {
    localStorage.removeItem('token');
}

export {
    isJwtExpired,
    getData,
    getJwt,
    setJwt,
    removeJwt
}