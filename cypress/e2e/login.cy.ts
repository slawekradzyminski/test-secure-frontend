/// <reference types="cypress" />

import { getRandomUser } from "../util/userProvider"

describe('Login tests', () => {

    const testUser = getRandomUser()
    let token: string

    beforeEach(() => {
        cy.visit('http://localhost:8081')
        cy.request('POST', 'http://localhost:4001/users/signup', testUser)
            .then(resp => {
                expect(resp.status).to.eq(201)
                token = resp.body.token
            })
    })

    afterEach(() => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:4001/users/${testUser.username}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(resp => {
                expect(resp.status).to.eq(204)
            })
    })

    it('should successfully login', () => {
        cy.get('[name=username]').type(testUser.username)
        cy.get('[name=password]').type(testUser.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', testUser.firstName)
    })
})
