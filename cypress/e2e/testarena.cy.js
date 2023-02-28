import { faker } from '@faker-js/faker';

/// <reference types="cypress" />

describe('Testarena training', () => {
    const message = faker.random.alphaNumeric(10)

    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/')
        cy.get('#email').type('administrator@testarena.pl')
        cy.get('#password').type('sumXQQ72$L')
        cy.get('#login').click()
    })

    it('should add new message', () => {
        cy.get('.icon_mail').click()
        cy.get('#j_msgContent').type(message)
        cy.get('#j_msgResponse-193').click()
        cy.get('.message_content_text').should('contain', message)
    })

})
