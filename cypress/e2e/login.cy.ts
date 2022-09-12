/// <reference types="cypress" />

import { getRandomUser } from "../util/userProvider"

describe('Login tests', () => {

    const testUser = getRandomUser()

    beforeEach(() => {
        cy.visit('http://localhost:8081')
        cy.request('POST', 'http://localhost:4001/users/signup', {
            username: testUser.username,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            password: testUser.password,
            roles: testUser.roles,
            email: testUser.email
        }).then(resp => {
            expect(resp.status).to.eq(201)
        })
        
    })

    it('should successfully login', () => {
        cy.get('[name=username]').type(testUser.username)
        cy.get('[name=password]').type(testUser.password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', testUser.firstName)
    })
})
