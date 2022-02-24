export default class LoginPage {

    #usernameField = '[name=username]'
    #passwordField = '[name=password]'
    #loginButton = '.btn-primary'
    #alert = '.alert'

    attemptLogin(username: string, password: string) {
        cy.get(this.#usernameField).type(username)
        cy.get(this.#passwordField).type(password)
        cy.get(this.#loginButton).click()
    }

    verifyLoginFailed() {
        cy.get(this.#alert)
            .should('contain.text', 'Invalid username/password')
            .should('have.class', 'alert-danger')
    }

}

