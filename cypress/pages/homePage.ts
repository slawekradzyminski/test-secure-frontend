import { User } from "../domain/user";

export const homePage = {

    selectors: {
        listOfUsers: () => cy.get('li')
    },

    clickEditUser: (user: User) => {
        homePage.selectors.listOfUsers().contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    },

    verifyUserExists: (user: User) => {
        homePage.selectors.listOfUsers().should('contain', `${user.firstName} ${user.lastName}`)
    },

    verifyUserNotExists: (user: User) => {
        homePage.selectors.listOfUsers().should('not.contain', `${user.firstName} ${user.lastName}`)
    }
}
