export const LoginPage = {

    getUsernameInput: () => cy.get('form input[name="username"]'),
    getPasswordInput: () => cy.get('form input[name="password"]'),
    getLoginButton: () => cy.get('.btn-primary'),
    getSpinner: () => cy.get('.btn-primary .spinner-border')

}