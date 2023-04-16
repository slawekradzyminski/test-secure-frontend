export const loginPage = {

    selectors: {
        loginButton: () => cy.get('.btn-primary')
    },

    attemptLogin: (username: string, password: string) => {
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        loginPage.selectors.loginButton().click()
    },

    clickRegister: () => {
        cy.get('.btn-link').click()
    }

}