import { getRandomUser, User } from "../utils/user"

describe('home page tests', () => {
    let user: User
    let token: string

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(returnedToken => {
            token = returnedToken
            cy.setCookie('token', returnedToken)
        })
        cy.visit('/')
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', 'add-user')
    })

    it('should delete all users except the current one', () => {
        cy.get('ul li').each(($el) => {
            if (!$el.text().includes(`${user.firstName} ${user.lastName}`)) {
                cy.wrap($el).find('.delete').click()
            }
        })
    })

    it('should cancel user deletion', () => {
        Cypress.on('window:confirm', (confirmationText) => {
            expect(confirmationText).to.eq('Are you sure you wish to delete this item?')
            return false
        })

        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.delete').click()
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).should('exist')
    })

})
