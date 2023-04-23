export const loginPage = {
    selectors: {
        getLoginButton: () => cy.get('.btn-primary'),
        getRegisterButton: () => cy.get('.btn-link')
    },

    attemptLogin: (username, password) => {
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        loginPage.selectors.getLoginButton().click()
    }

}