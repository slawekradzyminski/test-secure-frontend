export const homePage = {

    selectors: {
        userRow: 'li'
    },

    clickEditUser: (user) => {
        cy.get(homePage.selectors.userRow)
            .contains(`${user.firstName} ${user.lastName}`)
            .find('.edit')
            .click()
    },

    clickSendEmailTo: (user) => {
        cy.get(homePage.selectors.userRow)
            .contains(`${user.firstName} ${user.lastName}`)
            .find('.email')
            .click()
    }
}