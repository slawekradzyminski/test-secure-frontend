import { User } from "../domain/user";

export const registerPage = {

    selectors: {
        getUsernameInput: () => cy.get('form input[name="username"]'),
        getPasswordInput: () => cy.get('form input[name="password"]'),
        getFirstNameInput: () => cy.get('form input[name="firstName"]'),
        getLastNameInput: () => cy.get('form input[name="lastName"]'),
        getEmailInput: () => cy.get('form input[name="email"]'),
        getRegisterButton: () => cy.get('.btn-primary'),
    },

    attemptRegister: (user: User) => {
        registerPage.selectors.getUsernameInput().type(user.username)
        registerPage.selectors.getPasswordInput().type(user.password)
        registerPage.selectors.getFirstNameInput().type(user.firstName)
        registerPage.selectors.getEmailInput().type(user.email)
        registerPage.selectors.getLastNameInput().type(user.lastName)
        registerPage.selectors.getRegisterButton().click();
    }
    
}