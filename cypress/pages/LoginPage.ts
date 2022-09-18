export default class LoginPage {

    attemptLogin(username: string, password: string) {
        cy.get('input[name=username]').type(username)
        cy.get('input[name=password]').type(password)
        cy.get('.btn-primary').click()
    }

}