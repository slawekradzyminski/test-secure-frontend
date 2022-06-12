import { getRandomUser, User } from "../util/user";

export default class RegisterPage {


    attemptRegister(user: User) {
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=email]').type(user.email)
        this.clickRegister()


    }

    clickRegister() {
        cy.get('.btn-primary').click()
    }
}