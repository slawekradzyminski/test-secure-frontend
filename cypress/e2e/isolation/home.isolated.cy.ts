import users from '../../fixtures/users.json'

describe('Home page tests is isolation', () => {

    beforeEach(() => {
        cy.visitHomePageAsLoggedInUser()
    })

    it('should display all users', () => {
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($el, i) => {
            cy.wrap($el).should('contain.text', `${users[i].firstName} ${users[i].lastName}`)
        })
    })

    it('should delete user', () => {
        const firstUser = users[0]
        cy.intercept('DELETE', `**/users/${firstUser.username}`, { statusCode: 204 })

        cy.get('li').contains(`${firstUser.firstName} ${firstUser.lastName}`).find('.delete').click()

        cy.get('li').contains(`${firstUser.firstName} ${firstUser.lastName}`).should('not.exist')
        cy.get('li').should('have.length', users.length - 1)
    })

})
