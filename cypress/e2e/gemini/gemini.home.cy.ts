/// <reference types="cypress" />
 
describe('Gemini home page tests', () => {
    beforeEach(() => {
      cy.viewport('macbook-16')
      cy.setCookie('ge-necessary', '1670753642028')
      cy.visit('https://gemini.pl')
      cy.scrollTo(0, 600)    
    })
  
    it('should add to basket', () => {
        cy.get('[data-ga-id=icon_font_add_to_cart_icon_small_button_product_cart]').eq(0).click()
        cy.get('.text-green-action').should('be.visible')
        cy.get('#basket_button_on_main_bar .text-white').should('contain.text', 1)
    })
  
  })
 