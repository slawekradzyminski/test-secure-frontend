export const actionAlert = {

    verifySuccess: (message) => {
        cy.get('.alert-success').should('have.text', message)
    },

    verifyFailure: (message) => {
        cy.get('.alert-danger').should('have.text', message)
    }

}