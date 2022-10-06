import { User } from "../domain/user";

export const RegisterPage = {

    selectors: {
        getUsernameInput: () => cy.get('form input[name="username"]'),
        getPasswordInput: () => cy.get('form input[name="password"]'),
        getFirstNameInput: () => cy.get('form input[name="firstName"]'),
        getLastNameInput: () => cy.get('form input[name="lastName"]'),
        getEmailInput: () => cy.get('form input[name="email"]'),
        getRegisterButton: () => cy.get('.btn-primary'),
    },

    attemptRegister: (user: User) => {
        RegisterPage.selectors.getUsernameInput().type(user.username)
        RegisterPage.selectors.getPasswordInput().type(user.password)
        RegisterPage.selectors.getFirstNameInput().type(user.firstName)
        RegisterPage.selectors.getEmailInput().type(user.email)
        RegisterPage.selectors.getLastNameInput().type(user.lastName)
        RegisterPage.selectors.getRegisterButton().click();
    }
    
}