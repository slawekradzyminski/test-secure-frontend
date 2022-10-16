import { User } from "../domain/user";

export const registerPage = {
    selectors: {
        firstNameInput: '[name=firstName]',
        lastNameInput: '[name=lastName]',
        usernameInput: '[name=username]',
        passwordInput: '[name=password]',
        emailInput: '[name=email]',
        registerButton: '.btn-primary'
    },

    attemptRegister: (user: User) => {
        cy.get(registerPage.selectors.firstNameInput).type(user.firstName)
        cy.get(registerPage.selectors.lastNameInput).type(user.lastName)
        cy.get(registerPage.selectors.usernameInput).type(user.username)
        cy.get(registerPage.selectors.passwordInput).type(user.password)
        cy.get(registerPage.selectors.emailInput).type(user.email)
        cy.get(registerPage.selectors.registerButton).click()
    }
}