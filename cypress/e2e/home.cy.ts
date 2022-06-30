/// <reference types="cypress" />

import { getRandomUser } from "../util/user"

describe('login page', () => {

    let token: string
    const user = getRandomUser()

    before(() => {
        cy.register(user)
    })

    beforeEach(() => {
        cy.login(user.username, user.password).then(returnedToken => token = returnedToken)
        cy.visit('http://localhost:8081')
    })

    after(() => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:4001/users/${user.username}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            expect(resp.status).to.eq(204)
        })
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should redirect to adduser page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
