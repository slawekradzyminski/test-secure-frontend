import { handleResponse } from "./user.service";
import config from 'config';

export const sendEmail = (email) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(email)
    };

    return fetch(`${config.apiUrl}/email`, requestOptions).then(handleResponse);
}