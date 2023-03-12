import { Email } from "../utils/email";

export const emailPage = {
    selectors: {
        editButton: () => cy.get('.btn-primary')
    },

    sendEmail: (email: Email) => {
        cy.get('[name=subject]').type(email.subject)
        cy.get('[name=message]').type(email.body)
        emailPage.selectors.editButton().click()
    }
}