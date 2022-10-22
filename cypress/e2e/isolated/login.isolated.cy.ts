import { getRandomUser } from "../../domain/user"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                username: user.username,
                roles: user.roles,
                firstName: user.firstName,
                lastName: user.lastName,
                token: "fakeToken",
                email: user.email
            }
        })

        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        cy.get('input[name=username]').type(user.username)
        cy.get('input[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should handle error', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signin', {
            delay: 2000
        })

        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        cy.get('input[name=username]').type(user.username)
        cy.get('input[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
