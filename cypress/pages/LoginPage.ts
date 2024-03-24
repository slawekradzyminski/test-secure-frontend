export default class LoginPage {

    static selectors = {
        usernameField: '[name=username]'
    }

    static attemptLogin = (username: string, password: string) => {
        cy.get(LoginPage.selectors.usernameField).type(username)
        cy.get('[name=password]').type(password)
        LoginPage.clickLogin()
    }

    static clickRegister = () => {
        cy.get('.btn-link').click()
    }

    static clickLogin = () => {
        cy.get('.btn-primary').click()
    }

}