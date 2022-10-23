export const loginPage = {

    selectors: {
        usernameInput: () => cy.get('[name=username]'),
        passwordInput: () => cy.get('[name=password]'),
        loginButton: () => cy.get('.btn-primary')
    },

    attemptLogin: (username: string, password: string) => {
        loginPage.selectors.usernameInput().type(username)
        loginPage.selectors.passwordInput().type(password)
        loginPage.selectors.loginButton().click()
    },


}