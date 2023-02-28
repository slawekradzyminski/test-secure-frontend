import { User } from "../domain/user";

export const registerPage = {

    selectors: {
        usernameInput: () => cy.get('[name=username]'),
        passwordInput: () => cy.get('[name=password]'),
        firstNameInput: () => cy.get('[name=firstName]'),
        lastNameInput: () => cy.get('[name=lastName]'),
        emailInput: () => cy.get('[name=email]'),
        registerButton: () => cy.get('.btn-primary'),
        formInputs: () => cy.get('form input'),
        formGroupDivs: () => cy.get('.form-group div')
    },

    attemptRegister: (user: User) => {
        registerPage.selectors.usernameInput().type(user.username)
        registerPage.selectors.passwordInput().type(user.password)
        registerPage.selectors.firstNameInput().type(user.firstName)
        registerPage.selectors.lastNameInput().type(user.lastName)
        registerPage.selectors.emailInput().type(user.email)
        registerPage.selectors.registerButton().click()
    }

}