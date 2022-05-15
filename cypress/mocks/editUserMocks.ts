import { Method } from "../util/httpMethods"
import { User } from "../util/user"

export const editRequest = 'editRequest'

export const mockEditUser = (username: string) => {
    cy.intercept(Method.PUT, `**/users/${username}`, {statusCode: 200}).as(editRequest)
}
