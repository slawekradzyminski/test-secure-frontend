export const editScreen = {
    selectors: {
        firstNameInput: () => cy.get('[name="firstName"]'),
        lastNameInput: () => cy.get('[name="lastName"]'),
        emailInput: () => cy.get('[name="email"]'),
        usernameInput: () => cy.get('[name="username"]'),
        rolesInput: () => cy.get('[name="roles"]'),
        editButton: () => cy.get('.btn-primary')
    },

    verifyInputAreFilledWithData: (user) => {
        editScreen.selectors.firstNameInput().should('have.value', user.firstName)
        editScreen.selectors.lastNameInput().should('have.value', user.lastName)
        editScreen.selectors.emailInput().should('have.value', user.email)
        editScreen.selectors.usernameInput().should('have.value', user.username)
        editScreen.selectors.rolesInput().should('have.value', user.roles.join(','))
    },

    editAvailableFieldsAndSubmit: (user) => {
        editScreen.selectors.firstNameInput().clear().type(user.firstName)
        editScreen.selectors.lastNameInput().clear().type(user.lastName)
        editScreen.selectors.emailInput().clear().type(user.email)
        editScreen.selectors.editButton().click()
    }
}