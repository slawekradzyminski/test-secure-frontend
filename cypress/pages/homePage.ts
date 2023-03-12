import { User } from "../utils/user"

export const homePage = {

    selectors: {
        userRow: () => cy.get('li')
    },

    clickEditFor: (user: User) => {
        homePage.selectors.userRow()
            .contains(`${user.firstName} ${user.lastName}`)
            .find('.edit')
            .click()
    },

    clickLogout: () => {
        cy.get('#logout').click()
    },

    clickAddMore: () => {
        cy.get('#addmore').click()
    }

}