import { APIRequestContext, expect } from '@playwright/test'

export const login = async (request: APIRequestContext) => {
    const response = await request.post('http://localhost:4001/users/signin', {
            data: {
                username: 'admin',
                password: 'admin',
              }
        })
        expect(response.ok()).toBeTruthy();
        const body = await response.json()
        return body
}