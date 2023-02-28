import { User } from "../domain/user";

export const editPage = {

    selectors: {
        firstNameInput: () => cy.get('[name=firstName]'),
        lastNameInput: () => cy.get('[name=lastName]'),
        emailInput: () => cy.get('[name=email]'),
        editButton: () => cy.get('.btn-primary')
    },

    editUser: (user: User) => {
        editPage.selectors.firstNameInput().clear().type(user.firstName)
        editPage.selectors.lastNameInput().clear().type(user.lastName)
        editPage.selectors.emailInput().clear().type(user.email)
        editPage.selectors.editButton().click()
    }

}
