/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('home page', () => {
    beforeEach(() => {
        const username = faker.internet.userName()
        const password = faker.random.alphaNumeric(7)

        cy.register(faker.name.firstName(), faker.name.lastName(), username, password, faker.internet.email())
        cy.login(username, password)
        cy.visit('http://localhost:8081')
    })

    it('should display list of users', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })
})
