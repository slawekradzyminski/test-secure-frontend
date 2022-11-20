export const loginPage = {

    selectors: {
        usernameField: '[name=username]',
    },

    attemptLogin: (username: string, password: string) => {
        cy.get(loginPage.selectors.usernameField).type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()
    },

    clickRegister: () => {
        cy.get('.btn-link').click()
    }

}