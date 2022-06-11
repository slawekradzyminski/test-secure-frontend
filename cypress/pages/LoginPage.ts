export default class LoginPage {

    private _usernameField = '[name=username]'
    private _passwordField = '[name=password]'

    attemptLogin(username: string, password: string) {
        cy.get(this._usernameField).type(username)
        cy.get(this._passwordField).type(password)
        this.clickLogin()
    }

    clickRegister() {
        cy.get('.btn-link').click()
    }

    clickLogin() {
        cy.get('.btn-primary').click()
    }

}