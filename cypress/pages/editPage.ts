import { User } from "../utils/user";

export const editPage = {

    selectors: {
        firstNameInput: () => cy.get('[name=firstName]'),
        lastNameInput: () => cy.get('[name=lastName]'),
        usernameInput: () => cy.get('[name=username]'),
        emailInput: () => cy.get('[name=email]'),
        rolesInput: () => cy.get('[name=roles]'),
        editButton: () => cy.get('.btn-primary')
    },

    verifyDataPresent: (user: User) => {
        editPage.selectors.firstNameInput().should("have.value", `${user.firstName}`);
        editPage.selectors.lastNameInput().should("have.value", `${user.lastName}`);
        editPage.selectors.emailInput().should("have.value", `${user.email}`);
        editPage.selectors.usernameInput().should("have.value", `${user.username}`);
        editPage.selectors.rolesInput().should("have.value", `${user.roles}`);
    },

    editUserDetails: (user: User) => {
        editPage.selectors.firstNameInput().clear().type(user.firstName)
        editPage.selectors.lastNameInput().clear().type(user.lastName)
        editPage.selectors.emailInput().clear().type(user.email)
        editPage.selectors.editButton().click()
    }
}