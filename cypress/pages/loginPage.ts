export default class LoginPage {

    protected usernameField = '[name=username]'
    protected passwordField = '[name=password]'
    protected loginButton = '.btn-primary'
    protected registerButton = '.btn-link'
    protected invalidFeedback = '.invalid-feedback'

    login(username: string, password: string) {
        cy.get(this.usernameField).type(username)
        cy.get(this.passwordField).type(password)
        this.clickLogin()
    }

    clickRegister() {
        cy.get(this.registerButton).click()
    }

    clickLogin() {
        cy.get(this.loginButton).click()
    }

}