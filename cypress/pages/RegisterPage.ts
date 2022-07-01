import { getRandomEmail, getRandomString } from "../util/random"
import { User } from "../util/user"

export default class RegisterPage {

    private firstName = 'firstName'

    attemptRegister(username: string) {
        cy.getById(this.firstName).type(getRandomString())
        cy.getById('lastName').type(getRandomString())
        cy.getById('username').type(username)
        cy.getById('password').type(getRandomString())
        cy.getById('email').type(getRandomEmail())
        cy.get('.btn-primary').click()
    }

    attemptRegisterUser(user: User) {
        cy.getById(this.firstName).type(user.firstName)
        cy.getById('lastName').type(user.lastName)
        cy.getById('username').type(user.username)
        cy.getById('password').type(user.password)
        cy.getById('email').type(user.email)
        cy.get('.btn-primary').click()
    }

    clearAllInputs() {
        cy.getById(this.firstName).clear()
        cy.getById('lastName').clear()
        cy.getById('username').clear()
        cy.getById('password').clear()
        cy.getById('email').clear()
    }

}