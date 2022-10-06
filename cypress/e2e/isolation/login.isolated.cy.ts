import { Alert } from "../../components/Alert"
import { getRandomUser } from "../../domain/user"
import { HomePage } from "../../pages/HomePage"
import { LoginPage } from "../../pages/LoginPage"

describe('Login page tests in isolation', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () => {
        // 1. Muszę powiedzieć Cypressowi ze na request logowanie ma odpowiedzieć sukcesem (http 200)
        // 2. Muszę powiedzieć Cypressowi ze na request o listę uzytkownikow na odpowiedziec sukcesem (http 200) z konkretną listą

        // 1 - logowanie
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roles: user.roles,
                token: 'fakeToken'
            }
        })

        // 2 - lista uzytkowników
        cy.intercept('GET', '**/users', { fixture: 'users.json' })

        LoginPage.getUsernameInput().type(user.username);
        LoginPage.getPasswordInput().type(user.password);
        LoginPage.getLoginButton().click()

        HomePage.getTitle().should('contain.text', user.firstName)
    })

    it('should fail to login and display alert', () => {
        const message = "Invalid username/password supplied"

        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path: "/users/signin",
                status: 422,
                timestamp: "2022-10-06T09:17:32.444+00:00"
            }
        })

        LoginPage.getUsernameInput().type('admin');
        LoginPage.getPasswordInput().type('wrongPassword');
        LoginPage.getLoginButton().click()

        Alert.getAlertFailed().should('have.text', message)
    })

    it('should show loading indicator', () => {
        cy.intercept('POST', '**/users/signin', {
            delay: 2000
        })

        LoginPage.getUsernameInput().type('admin');
        LoginPage.getPasswordInput().type('wrongPassword');
        LoginPage.getLoginButton().click()

        LoginPage.getSpinner().should('be.visible')
    })

})
