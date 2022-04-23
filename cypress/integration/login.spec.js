/// <reference types="cypress" />


describe('login page', () => {
    let jwtToken;

    beforeEach(() => {
        cy.apiLogin('admin', 'admin').then(token => jwtToken = token)
        cy.visit('')
    })

    it('should successfully login', () => {
        cy.get('h1').should('contain.text', 'Slawomir')
    })

    it('should return reusable jwt token', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:4001/users',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        }).then(resp => {
            expect(resp.status).to.eq(200)
        })
    })

})
