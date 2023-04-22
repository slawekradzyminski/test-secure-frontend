/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Test Arena home page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type('administrator@testarena.pl')
        cy.get('#password').type('sumXQQ72$L')
        cy.get('#login').click()
        cy.visit('http://demo.testarena.pl/moje_wiadomosci')
    })

    it('should add new message', () => {
        const sentence = faker.lorem.sentence()
        cy.get('#j_msgContent').type(sentence)
        cy.get('#j_msgResponse-193').click()
        cy.get('.message_content_text').last().should('contain.text', sentence)
    })

})
