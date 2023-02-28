export default class LoginPage {

    private static usernameSelector = '[name=username]'
    private static passwordSelector = '[name=password]'
    private static loginButtonSelector = '.btn-primary'

    static attemptLogin(username: string, password: string) {
        cy.get(this.usernameSelector).type(username)
        cy.get(this.passwordSelector).type(password)
        this.clickLogin()
    }

    static clickLogin = () => {
        cy.get(this.loginButtonSelector).click()
    }

}