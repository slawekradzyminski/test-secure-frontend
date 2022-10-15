/// <reference types="cypress" />

import { getRandomUser } from "../domain/user"

describe('Home page tests', () => {
    beforeEach(() => {
        // 0 - rejestracja uytkownika przez API
        // 1. Wysłać request logowania na /users/signin
        // 2. Ustawić odpowiedź w localStorage pod kluczem user
        // 3. Ustawić ciastko token z wartością tokena jwt który przyszedł w odpowiedzi
        // 4. Wejść na stronę główną - powinniśmy juz być zalogowani :)
    
        const user = getRandomUser()
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signup',
            body: user
        }).then((resp) => {
            expect(resp.status).to.eq(201)
        })

        cy.request({
            // 1
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: user.username,
                password: user.password
            }
        }).then((resp) => {
            expect(resp.status).to.eq(200)
            // 2
            localStorage.setItem('user', JSON.stringify(resp.body))
            // 3
            cy.setCookie('token', resp.body.token)
        })

        // 4
        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()

        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()

        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', '/add-user')
    })

})
