describe('Home page tests', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

// cy.request()
//  .then(resp => localStorage.setItem)
//  .then(resp => cy.setCookie())
//  .then(() => cy visit))
//  .then(() => cy.get(li))

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
