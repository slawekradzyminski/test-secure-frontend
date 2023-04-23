export const homePage = {
    clickMailUser: (firstName) => {
        cy.get('li').contains(firstName).find('.email').click()
    }
}