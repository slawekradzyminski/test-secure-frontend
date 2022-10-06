export const RegisterPage = {

    selectors: {
        getUsernameInput: () => cy.get('form input[name="username"]'),
        getPasswordInput: () => cy.get('form input[name="password"]'),
        getFirstNameInput: () => cy.get('form input[name="firstName"]'),
        getLastNameInput: () => cy.get('form input[name="lastName"]'),
        getEmailInput: () => cy.get('form input[name="email"]'),
        getRegisterButton: () => cy.get('.btn-primary'),
    },
    
}