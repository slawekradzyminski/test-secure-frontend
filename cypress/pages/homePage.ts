import { User } from "../utils/user"

export const homePage = {

    selectors: {
        userRow: () => cy.get('li')
    },

    clickEditFor: (user: User) => {
        clickSelector(user, '.edit')
    },

    clickEmailFor: (user: User) => {
        clickSelector(user, '.email')
    },

    clickLogout: () => {
        cy.get('#logout').click()
    },

    clickAddMore: () => {
        cy.get('#addmore').click()
    }

}

const clickSelector = (user: User, selector: string) => {
    homePage.selectors.userRow()
        .contains(`${user.firstName} ${user.lastName}`)
        .find(selector)
        .click()
}
