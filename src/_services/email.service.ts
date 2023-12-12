import { handleResponse } from "./user.service";
import { authHeader } from '../_helpers';
import { Email } from "../types";


export const sendEmail = (email: Email) => {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(email)
    };

    return fetch(`${process.env.API_URL}/email`, requestOptions).then(handleResponse);
}