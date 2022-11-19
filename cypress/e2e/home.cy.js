describe('home page tests', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('[name=username]').type('admin')
      cy.get('[name=password]').type('admin')
      cy.get('.btn-primary').click()
    })
  
    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', 'add-user')
    })

  })
  