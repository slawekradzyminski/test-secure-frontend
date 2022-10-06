export const loginPage = {

    selectors: {
        getUsernameInput: () => cy.get('form input[name="username"]'),
        getPasswordInput: () => cy.get('form input[name="password"]'),
        getLoginButton: () => cy.get('.btn-primary'),
        getSpinner: () => cy.get('.btn-primary .spinner-border')
    },
    
    attemptLogin: (username: string, password: string) => {
        loginPage.selectors.getUsernameInput().type(username)
        loginPage.selectors.getPasswordInput().type(password)
        loginPage.selectors.getLoginButton().click()
    }

}