/// <reference types="cypress" />

import { getRandomEmail, getRandomString } from "../util/random"


describe('login page', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        // given
        const username = getRandomString()
        const firstName = getRandomString()
        const email = getRandomString()
        const lastName = getRandomString()
        const password = getRandomString()

        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        }).as('registerRequest')

        // when
        cy.get('[name=firstName]').type(firstName)
        cy.get('[name=lastName]').type(lastName)
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('[name=email]').type(email)
        cy.get('.btn-primary').click()

        // then
        cy.contains('Registration successful').should('be.visible')
        cy.wait('@registerRequest').its('request.body').should('deep.equal', {
            firstName: firstName,
            lastName: lastName,
            password: password,
            username: username,
            email: email,
            roles: [
                "ROLE_CLIENT",
            ]
        })

    })

    it('should fail to register', () => {
        // given
        const username = 'a'
        const password = 'a'
        const firstName = 'a'
        const lastName = 'a'
        const email = 'a'

        cy.intercept('POST', '**/users/signup', {
            statusCode: 400,
            body: {
                status: 400,
                firstName: "Minimum firstName length: 4 characters",
                lastName: "Minimum firstName length: 4 characters",
                password: "Minimum password length: 4 characters",
                email: "musi być poprawnie sformatowanym adresem e-mail",
                username: "Minimum username length: 4 characters"
            }
        }).as('registrationRequest')

        // when
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('[name=firstName]').type(firstName)
        cy.get('[name=lastName]').type(lastName)
        cy.get('[name=email]').type(email)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('contain.text', 'Bad Request')

    })

    it('should display loading indicator after clicking signup', () => {
        // given
        cy.intercept('POST', '**/users/signup', { delay: 1000 })

        // when
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=email]').type(getRandomEmail())
        cy.get('.btn-primary').click()

        // then
        cy.get('.btn-primary > .spinner-border').should('be.visible')
    })

})
