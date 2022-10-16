import users from '../../fixtures/users.json'

describe('Home page tests is isolation', () => {

    beforeEach(() => {
        cy.visitHomePageAsLoggedInUser()
    })

    it('should display all users', () => {
        cy.get('li').should('have.length', 2)
    })

})
