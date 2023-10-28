/// <reference types="cypress" />

describe('TestArena add project page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type('administrator@testarena.pl')
        cy.get('#password').type('sumXQQ72$L')    
        cy.get('#login').click()
        cy.get('#header_logo').should('be.visible')
        cy.visit('http://demo.testarena.pl/administration/add_project')
    })

    it('should successfully add new project', () => {
        const project = getRandomProject()
    })


})
