export const emailPage = {

    attemptSendEmail: (email) => {
        cy.get('[name=subject]').type(email.emailSubject)
        cy.get('[name=message]').type(email.emailMessage)
        cy.get('.btn-primary').click()
    }

}