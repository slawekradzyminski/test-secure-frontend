/// <reference types="cypress" />

import { generateUser } from "../utils/user"

describe('Home page', () => {
    beforeEach(() => {
        const user = generateUser()
        cy.registerViaAPI(user)

        // 1. Musimy wysłać request logowania
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: user.username,
                password: user.password
            }
        }).then(resp => {
            // 2. Odpowiedź musimy zapisać w localStorage
            localStorage.setItem('user', JSON.stringify(resp.body))
            // 3. Token z odpowiedzi musimy zapisać jako wartość ciastka o nazwie token
            cy.setCookie('token', resp.body.token)
        })

        cy.visit('http://localhost:8081')
    })

    it('should successfully logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })

    it('should display at least one user', () => {
        cy.get('li').should('have.length.at.least', 1)
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()

        cy.url().should('contain', 'add-user')
    })

})
