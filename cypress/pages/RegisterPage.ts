import { User } from "../util/userProvider";

export default class RegisterPage {

    private usernameInput = '[name=username]'

    attemptRegister(user: User) {
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get(this.usernameInput).type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        cy.get('.btn-primary').click()
    }

    clickCancel() {
        cy.get('.btn-link').click()
    }

}