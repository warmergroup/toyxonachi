export const getToken = () => {
    if (process.server) return null;
    return localStorage.getItem('token');
};

export const setToken = (token: string) => {
    if (process.server) return;
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    if (process.server) return;
    localStorage.removeItem('token');
};
