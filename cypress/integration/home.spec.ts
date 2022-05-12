/// <reference types="cypress" />

import { getRandomUser } from '../util/user';

describe('home page', () => {
    let token: string
    const user = getRandomUser()

    beforeEach(() => {
        cy.register(user)
        cy.login(user.username, user.password).then(jwtToken => token = jwtToken)
        cy.visit('http://localhost:8081')
    })

    afterEach(() => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:4001/users/${user.username}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(resp => {
            expect(resp.status).to.eq(204)
        })
    })

    it('should display list of users', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should succesfully logout', () => {
        cy.get('#logout').click();
        cy.get('h2').should('have.text', 'Login').then(() => {
            expect(localStorage.getItem('user')).to.be.null
        })
    })

    it('should succesfully click add more user and check page after it', () => {
        cy.get('#addmore').click();
        cy.url().should('eq', 'http://localhost:8081/add-user')
    })
})
