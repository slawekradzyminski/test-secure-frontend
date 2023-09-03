export const emailPage = {

    attemptSendingEmail: (subject, message) => {
        cy.get('[name=subject]').type(subject)
        cy.get('[name=message]').type(message)
        cy.get('.btn-primary').click()
    }

}