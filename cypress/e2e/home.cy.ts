/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        // 1. Mam wysłać request na /users/signin z poprawnymi danymi logowania
        // 2. Oczekuję odpowiedzi http 200 bo to znaczy ze logowanie się udało
        // 3. Chcę ustawić odpowiedź w localStorage
        // 4. Chcę ustawić token z odpowiedzi w ciastku o nazwie token

        // 1.
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: 'admin',
                password: 'admin',
            }
        }).then((resp) => {
            // 2.
            expect(resp.status).to.eq(200)
            // 3.
            localStorage.setItem('user', JSON.stringify(resp.body))
            // 4.
            cy.setCookie('token', resp.body.token)
        })

        cy.visit('')
        cy.getCookie('token').its('value').should('not.be.empty')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should open add more users page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
