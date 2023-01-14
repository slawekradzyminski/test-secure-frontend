/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(() => {
        // 1. Musimy wysłać request na /users/signin (admin/admin)
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: 'admin',
                password: 'admin',
            }
        }).then((resp) => {
            // 2. Musimy ustawić odpowiedź w localStorage pod kluczem user
            localStorage.setItem('user', JSON.stringify(resp.body))
            // 3. Musimy ustawić token z odpowiedzi jako ciastko o nazwie token
            cy.setCookie('token', resp.body.token)
        })
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.gte', 1)
    })

    it('should log out', () => {
        cy.get('#logout').click();
        cy.url().should('contain', '/login');
    });

    it('should open add more users page', () => {
        cy.get('#addmore').click();
        cy.url().should('contain', '/add-user');
    });

})
