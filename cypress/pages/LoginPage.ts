export const LoginPage = {

    selectors: {
        getUsernameInput: () => cy.get('form input[name="username"]'),
        getPasswordInput: () => cy.get('form input[name="password"]'),
        getLoginButton: () => cy.get('.btn-primary'),
        getSpinner: () => cy.get('.btn-primary .spinner-border')
    },
    
    attemptLogin: (username: string, password: string) => {
        LoginPage.selectors.getUsernameInput().type(username)
        LoginPage.selectors.getPasswordInput().type(password)
        LoginPage.selectors.getLoginButton().click()
    }

}