import { User } from "../domain/user";

export const editPage = {
    selectors: {
        firstNameInput: '[name=firstName]',
        lastNameInput: '[name=lastName]',
        usernameInput: '[name=username]',
        emailInput: '[name=email]', 
        rolesInput: '[name=roles]',
        editButton: '.btn-primary'
    },

    checkDataInEditFields: (user: User) => {
        cy.get(editPage.selectors.firstNameInput).should('have.value', user.firstName)
        cy.get(editPage.selectors.lastNameInput).should('have.value', user.lastName)
        cy.get(editPage.selectors.usernameInput).should('have.value', user.username)
        cy.get(editPage.selectors.emailInput).should('have.value', user.email)
        cy.get(editPage.selectors.rolesInput).should('have.value', user.roles.join(','))
    },

    fillAvailableInputs: (user: User) => {
        cy.get(editPage.selectors.firstNameInput).clear().type(user.firstName)
        cy.get(editPage.selectors.lastNameInput).clear().type(user.lastName)
        cy.get(editPage.selectors.emailInput).clear().type(user.email)
        cy.get(editPage.selectors.editButton).click()
    }
}
