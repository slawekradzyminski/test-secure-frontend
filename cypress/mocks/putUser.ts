import { User } from "../utils/user";

export const putUserMocks = {

    mockSuccess: (username: string) => {
        cy.intercept('PUT', `**/users/${username}`, { statusCode: 200 })
    }

}