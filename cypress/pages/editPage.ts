import { User } from "../utils/user"

export const editPage = {

    selectors: {

    },

    attemptEditUser: (user: User) => {
        cy.get('[name=firstName]').clear().type(user.firstName)
        cy.get('[name=lastName]').clear().type(user.lastName)
        cy.get('[name=email]').clear().type(user.email)
        cy.get('.btn-primary').click()
    }

}