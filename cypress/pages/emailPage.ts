import { Email } from "../utils/email";

export const emailPage = {

    selectors: {

    },

    attemptSendingEmail: (email: Email) => {
        cy.get('[name=subject]').type(email.subject)
        cy.get('[name=message]').type(email.message)
        cy.get('.btn-primary').click()
    }

}