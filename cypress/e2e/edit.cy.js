/// <reference types="cypress" />

describe('Edit page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
      cy.login('admin', 'admin')
      cy.get('li').contains('Slawomir Radzyminski').find('.edit').click();
    })
 
    it('should autofill edit profile', () => {
        cy.get("[name='firstName']").should('have.value', 'Slawomir');
        cy.get("[name='lastName']").should('have.value', 'Radzyminski');
        cy.get("[name='username']").should('have.value','admin');
        cy.get("[name='email']").should('have.value', 'admin@email.com');
        cy.get("[name='roles']").should('have.value', 'ROLE_ADMIN,ROLE_CLIENT')
    })
  })
