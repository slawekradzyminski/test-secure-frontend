/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        // 1. Wysłać request na users/signin z usernamem i hasłem
        // 2. Musimy zapisać odpowiedź w localStorage pod kluczem user
        // 3. Musimy zapisać token z odpowiedzi jako ciastko o nazwie token
        // 4. Musimy wejść na stronę główną

        // 1
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: 'admin',
                password: 'admin'
            }
        }).then((odpowiedz) => {
            // 2
            localStorage.setItem('user', JSON.stringify(odpowiedz.body))
            // 3
            cy.setCookie('token', odpowiedz.body.token)
        })

        // 4
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.gte', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()

        cy.url().should('contain', '/login')
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()

        cy.url().should('contain', '/add-user')
    })

})
