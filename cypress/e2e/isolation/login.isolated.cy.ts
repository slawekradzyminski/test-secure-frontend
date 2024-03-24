/// <reference types="cypress" />

import { getLoginResponseFor } from "../../domain/http/login"
import { getRandomUser } from "../../generators/userGenerator"

describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        // 2 pierwsze parametry definiują nam jaki request chcemy zamockować/zastubować
        // 3 parametr definiuje nam oczekiwaną odpowiedź na zamockowane zapytanie
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: getLoginResponseFor(user)
        })
        cy.intercept('GET', '**/users', {
            statusCode: 200,
            fixture: 'users.json'
        })
        cy.get('[name=password]').should('be.visible')
        cy.percySnapshot('Login page', { widths: [1280] })

        // when
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        // given
        const message = "Invalid username/password supplied"
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path : "/users/signin",
                status: 422,
                timestamp : "2024-03-23T13:45:53.051+00:00"
            }
        })

        // when
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-danger').should('have.text', message)
    })

})

