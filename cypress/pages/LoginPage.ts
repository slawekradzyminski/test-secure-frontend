export default class LoginPage {

    attemptLogin(username: string, password: string) {
        cy.getById('username').type(username)
        cy.getById('password').type(password)
        cy.get('.btn-primary').click()
    }

}