/// <reference types="cypress" />

describe('Password recovery page', () => {
    beforeEach(() => {
      cy.visit('http://demo.testarena.pl/odzyskaj_haslo')
    })
  
    it('should open login page', () => {
        cy.get("a[href='http://demo.testarena.pl/zaloguj']").click()
        cy.url().should('contain', 'zaloguj')
    })

    it('should trigger frontend validation', () => {
        cy.get('#recover').click()
        cy.get('.login_form_error').should('have.text', 'Pole wymagane')
        cy.get('.error_msg').should('have.text', 'Nie uzupełniono pola captcha.')
    })

  })
  