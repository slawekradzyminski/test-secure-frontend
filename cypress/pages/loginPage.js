export const loginPage = {

    selectors: {
        loginButton: '.btn-primary'
    },

    attemptLogin: (username, password) => {
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        loginPage.clickLogin()
    },

    clickLogin: () => {
        cy.get(loginPage.selectors.loginButton).click()
    },

    clickRegister: () => {
        cy.get('.btn-link').click()
    }

}