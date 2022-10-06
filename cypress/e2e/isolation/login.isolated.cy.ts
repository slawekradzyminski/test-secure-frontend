import { getRandomUser } from "../../domain/user"

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

        cy.get('form input[name="username"]').type(user.username);
        cy.get('form input[name="password"]').type(user.password);
        cy.get('.btn-primary').click();

        cy.get('h1').should('contain.text', user.firstName)
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

        cy.get('form input[name="username"]').type('admin');
        cy.get('form input[name="password"]').type('wrongPassword');
        cy.get('.btn-primary').click();

        cy.get('.alert-danger').should('have.text', message)
    })

    it('should show loading indicator', () => {
        cy.intercept('POST', '**/users/signin', {
            delay: 1000
        })

        cy.get('form input[name="username"]').type('admin');
        cy.get('form input[name="password"]').type('wrongPassword');
        cy.get('.btn-primary').click();

        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
