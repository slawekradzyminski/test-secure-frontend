export default class RegisterPage {

    static clickRegister = () => {
        cy.get('.btn-primary').click()
    }

    static clickCancel = () => {
        cy.get('.btn-link').click()
    }

}