export default class Alert {

    static verifySuccess(content: string) {
        cy.get('.alert-success').should('have.text', content)
    }

    static verifyFailure(content: string) {
        cy.get('.alert-danger').should('have.text', content)
    }

}