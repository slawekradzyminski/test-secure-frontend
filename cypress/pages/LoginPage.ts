export default class LoginPage {

    private static usernameInput = () => cy.get('[name=username]')
    private static passwordInput = () => cy.get('[name=password]')
    private static loginButton = () => cy.get('.btn-primary')
    private static registerButton = () => cy.get('.btn-link')

    static attemptLogin = (username: string, password: string) => {
        LoginPage.usernameInput().type(username)
        LoginPage.passwordInput().type(password)
        LoginPage.loginButton().click()
    }

    static clickLogin = () => {
        LoginPage.loginButton().click()
    }

    static clickRegister = () => {
        LoginPage.registerButton().click()
    }

}