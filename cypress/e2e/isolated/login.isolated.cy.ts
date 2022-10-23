import { getRandomUser } from "../../domain/user"
import HomePage from "../../pages/HomePage"
import LoginPage from "../../pages/LoginPage"

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
        }).as('loginRequest')

        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        LoginPage.getUsernameInput().type(user.username)
        LoginPage.getPasswordInput().type(user.password)
        LoginPage.getLoginButton().click()

        HomePage.getHeader().should('contain.text', user.firstName)
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password
        })
    })

    it('should display loading indicator', () => {
        const user = getRandomUser()

        cy.intercept('POST', '**/users/signin', {
            delay: 2000
        })

        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        LoginPage.getUsernameInput().type(user.username)
        LoginPage.getPasswordInput().type(user.password)
        LoginPage.getLoginButton().click()

        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
