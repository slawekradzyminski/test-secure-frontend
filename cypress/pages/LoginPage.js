export default class LoginPage {

    static attemptLogin = (username, password) => {
        cy.get('input[name=username]').type(username)
        cy.get('input[type=password]').type(password)
        LoginPage.clickLogin()
    }

    static clickLogin = () => {
        cy.get('.btn-primary').click()
    }

    static clickRegister = () => {
        cy.get('.btn-link').click()
    }

}