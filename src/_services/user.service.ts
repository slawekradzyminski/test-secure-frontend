import { EditUser, User } from '../types';
import { handleResponse } from './responseHandler';

const apiUrl = process.env.API_URL;

export const userService = {
    login,
    logout,
    refresh,
    register,
    getAll,
    get,
    update,
    delete: _delete
};

async function login(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify({ username, password })
    };

    const response = await fetch(`${apiUrl}/users/signin`, requestOptions);
    const user = await handleResponse(response);
    return user;
}

async function logout() {
    const requestOptions = {
        credentials: 'include' as RequestCredentials,
        method: 'POST'
    };
    const response = await fetch(`${apiUrl}/users/logout`, requestOptions);
    return handleResponse(response);
}

async function refresh() {
    const requestOptions = {
        credentials: "include" as RequestCredentials,
        method: "GET"
    };
    const response = await fetch(`${apiUrl}/users/refresh`, requestOptions);
    const isAuthenticated = await handleResponse(response);
    return isAuthenticated;
}

async function getAll() {
    const requestOptions = {
        credentials: "include" as RequestCredentials,
        method: "GET"
    };
    const response = await fetch(`${apiUrl}/users`, requestOptions);
    return handleResponse(response);
}

async function get(username: string) {
    const requestOptions = {
        credentials: "include" as RequestCredentials,
        method: "GET"
    };
    const response = await fetch(`${apiUrl}/users/${username}`, requestOptions);
    return handleResponse(response);
}

async function register(user: User) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify(user)
    };

    const response = await fetch(`${apiUrl}/users/signup`, requestOptions);
    return handleResponse(response);
}

async function update(username: string, user: EditUser) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify(user)
    };

    const response = await fetch(`${apiUrl}/users/${username}`, requestOptions);
    return handleResponse(response);
}

async function _delete(username: string) {
    const requestOptions = {
        method: 'DELETE',
        credentials: "include" as RequestCredentials,
    };

    const response = await fetch(`${apiUrl}/users/${username}`, requestOptions);
    return handleResponse(response);
}

