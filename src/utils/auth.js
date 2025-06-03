const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }).then(res => res.ok ? res.json() : Promise.reject('Error en el registro'));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }).then(res => res.ok ? res.json(): Promise.reject('Error en el login'));
};