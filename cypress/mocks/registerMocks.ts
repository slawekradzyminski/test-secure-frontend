import { HttpMethod } from "../util/httpMethods";
import { User } from "../util/user";

const registerUrl = '**/users/signup'

export const mockRegister = () => {
    cy.intercept(HttpMethod.POST, registerUrl, {
        statusCode: 201,
        body: {
            "token":"fakeToken"
        }
    })
}