export const homePage = {

    clickLogout: () => cy.get('#logout').click(),

    clickAddMoreUser: () => cy.get('#addmore').click(),

    clickEmailUser: (user) => {
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.email').click()
    },

    clickEditUser: (user) => {
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    }

}