import { User } from "../utils/user";

export const homePage = {

    selectors: {
        userRow: () => cy.get('li'),
        userSpecificUserRow: (user: User) => cy.get('li').contains(`${user.firstName} ${user.lastName}`)
    },

    clickLogout: () => cy.get('#logout').click(),

    clickAddMore: () => cy.get('#addmore').click(),

}