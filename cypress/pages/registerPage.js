export const registerPage = {
    selectors: {
        getRegisterButton: () => cy.get('.btn-primary'),
        getLoginButton: () => cy.get('.btn-link')
    },

    attemptRegister: (user) => {
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('[name=firstName]').type(user.firstName)
        cy.get('[name=lastName]').type(user.lastName)
        cy.get('[name=email]').type(user.email)
        registerPage.selectors.getRegisterButton().click()
    },

}