/// <reference types="cypress" />

import { getUser } from "../utils/user"

describe('Home page tests', () => {
    beforeEach(() => {
        const user = getUser()
        cy.register(user)

        // 1. Wysyłam request logowania
        // 2. Odpowiedź ustawiamy w localStorage pod kluczem 'user'
        // 3. Ustawiamy token z odpowiedzi jako ciastko o nazwie token

        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: user.username,
                password: user.password
            }
        }).then(resp => {
            localStorage.setItem('user', JSON.stringify(resp.body))
            cy.setCookie('token', resp.body.token)
        })

        cy.visit('http://localhost:8081')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })


    it('should logout', () => {
        cy.get('#logout').click()
        
        cy.url().should('contain', '/login')
    })
})
