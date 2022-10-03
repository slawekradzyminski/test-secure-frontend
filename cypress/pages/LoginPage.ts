export default class LoginPage {
    
    private usernameInput = '[name=username]'

    clickLogin() {
        cy.get('.btn-primary').click()
    }

    attemptLogin(username: string, password: string) {
        cy.get(this.usernameInput).type(username)
        cy.get('[name=password]').type(password)
        this.clickLogin()
    }

}