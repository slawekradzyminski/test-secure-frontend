export const loginPage = {

    getters: {
        usernameInput: () => cy.get('[name=username]'),
        passwordInput: () => cy.get('[name=password]'),
        loginButton: () => cy.get('.btn-primary')
    },

    attemptLogin: (username: string, password: string) => {
        loginPage.getters.usernameInput().type(username)
        loginPage.getters.passwordInput().type(password)
        loginPage.getters.loginButton().click()
    },


}