import Cookies from 'js-cookie'
import { User } from '../types';
import { authHeader } from '../_helpers/auth-header';

const apiUrl = process.env.API_URL;

export const handleResponse = async (response: Response) => {
    const text = await response.text();
    const data = text && JSON.parse(text);
    if (!response.ok) {
        if (response.status === 403) {
            logout();
            location.reload();
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}

export const userService = {
    login,
    logout,
    register,
    getAll,
    update,
    delete: _delete
};

async function login(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const response = await fetch(`${apiUrl}/users/signin`, requestOptions);
    const user = await handleResponse(response);
    localStorage.setItem('user', JSON.stringify(user));
    Cookies.set('token', user.token);
    return user;
}

function logout() {
    localStorage.removeItem('user');
}

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`${apiUrl}/users`, requestOptions);
    return handleResponse(response);
}

async function register(user: User) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const response = await fetch(`${apiUrl}/users/signup`, requestOptions);
    return handleResponse(response);
}

async function update(user: User) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const response = await fetch(`${apiUrl}/users/${user.username}`, requestOptions);
    return handleResponse(response);
}

async function _delete(username: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    const response = await fetch(`${apiUrl}/users/${username}`, requestOptions);
    return handleResponse(response);
}

