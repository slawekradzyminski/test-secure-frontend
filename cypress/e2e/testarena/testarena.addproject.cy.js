/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Test Arena add project tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type('administrator@testarena.pl')
        cy.get('#password').type('sumXQQ72$L')
        cy.get('#login').click()
        cy.visit('http://demo.testarena.pl/administration/add_project')
    })

    it('should add new project', () => {
        cy.get('#name').type(faker.random.word())
        cy.get('#prefix').type(faker.random.alpha(3))
        cy.get('#description').type(faker.lorem.sentence())
        cy.get('#save').click()
        cy.get('#j_info_box > p').should('have.text', 'Projekt został dodany.')
    })

})
