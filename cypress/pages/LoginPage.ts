class LoginPage {

    #usernameField = '[name=username]'
    #passwordField = '[name=password]'
    #loginButton = '.btn-primary'

    login(username: string, password: string) {
        cy.get(this.#usernameField).type(username)
        cy.get(this.#passwordField).type(password)
        cy.get(this.#loginButton).click()
    }

}

export default LoginPage