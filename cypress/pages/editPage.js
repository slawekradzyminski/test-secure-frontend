export const editPage = {

    selectors: {
        firstNameInput: () => cy.get("[name='firstName']"),
        lastNameInput: () => cy.get("[name='lastName']"),
        emailInput: () => cy.get("[name='email']"),
        usernameField: () => cy.get("[name=username]"),
        rolesField: () => cy.get("[name=roles]"),
        editButton: () => cy.get('.btn-primary')
    },

    editUser: (user) => {
        editPage.selectors.firstNameInput().clear().type(user.firstName)
        editPage.selectors.lastNameInput().clear().type(user.lastName)
        editPage.selectors.emailInput().clear().type(user.email)
        editPage.selectors.editButton().click()
    },

    clickCancel: () => cy.get('.btn-link').click()

}