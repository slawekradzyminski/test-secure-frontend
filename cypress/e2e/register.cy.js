/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Register tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        const userName = faker.internet.userName()
        const password = faker.internet.password()
        const firstName = faker.name.firstName()

        cy.get('[name=username]').type(userName)
        cy.get('[name=password]').type(password)
        cy.get('[name=firstName]').type(firstName)
        cy.get('[name=lastName]').type(faker.name.lastName())
        cy.get('[name=email]').type(faker.internet.email())
        cy.get('.btn-primary').click()

        cy.get('.alert').should('contain.text', 'Registration successful')

        cy.get('[name=username]').type(userName)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', firstName)
    })

    it('should open login page', () => {
        cy.get('.btn-link').click()

        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()
        //  albo 
        cy.get('.invalid-feedback').should('have.length', 5).each(($el) => {
            cy.wrap($el).should('have.text', 'Required field length is 4 or more')
        })
        cy.get('input.is-invalid').should('have.length', 5)
    })

})
