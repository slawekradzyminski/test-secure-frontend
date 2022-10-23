export default class LoginPage {

    private static usernameInput = '[name=username]'
    private static passwordInput = '[name=password]'
    private static loginButton = '.btn-primary'

    static attemptLogin = (username: string, password: string) => {
        cy.get(LoginPage.usernameInput).type(username)
        cy.get(LoginPage.passwordInput).type(password)
        LoginPage.clickLoginButton()
    }

    static clickLoginButton = () => {
        cy.get(LoginPage.loginButton).click()
    }

}