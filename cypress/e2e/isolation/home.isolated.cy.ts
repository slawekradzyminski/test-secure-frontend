import users from '../../fixtures/users.json'

describe('Home page tests in isolation', () => {
    beforeEach(() => {
        cy.visitHomePageAsLoggedInUser()
    })

    it('should display all users', () => {
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($el, i) => {
            // expect($el.text()).to.contain(`${users[i].firstName} ${users[i].lastName}`)
            cy.wrap($el).should('contain.text', `${users[i].firstName} ${users[i].lastName}`)
        })
    })

})
