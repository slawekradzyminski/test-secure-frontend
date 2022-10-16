export default class LoginPage {
    private static invalidInputSelector = '.invalid-feedback'

    static attemptLogin = (username: string, password: string) => {
        cy.get('input[name=username]').type(username)
        cy.get('input[name=password]').type(password)
        LoginPage.clickLogin()
    }

    static clickLogin = () => {
        cy.get('.btn-primary').click()
    }

    static clickRegister = () => {
        cy.get('.btn-link').click()
    }

    static checkValidationErrors() {
        cy.get(LoginPage.invalidInputSelector).should('have.length', 2)
        cy.get(LoginPage.invalidInputSelector).each(($el) => {
            cy.wrap($el).should('have.text', 'Required field length is 4 or more')
        })

        cy.get('.is-invalid').should('have.length', 2)
        cy.get('input').each(($el) => {
            cy.wrap($el).should('have.class', 'is-invalid')
        })
    }

}