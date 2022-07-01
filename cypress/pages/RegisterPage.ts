import { getRandomEmail, getRandomString } from "../util/random"

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

    clearAllInputs() {
        cy.getById(this.firstName).clear()
        cy.getById('lastName').clear()
        cy.getById('username').clear()
        cy.getById('password').clear()
        cy.getById('email').clear()
    }

}