describe('Login page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        cy.get('input[name=username]').type('admin')
        cy.get('input[name=password]').type('admin')
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', 'Slawomir')
    })

})
