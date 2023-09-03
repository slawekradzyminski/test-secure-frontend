/// <reference types="cypress" />

import { generateRandomString } from "../utils/random"
import { getRandomUser } from "./domain/user"

describe('Email page tests', () => {
    beforeEach(() => {
        const user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('http://localhost:8081')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.email').click()
    })

    it('should successfully send an email', () => {
        // when
        cy.get('[name=subject]').type(generateRandomString())
        cy.get('[name=message]').type(generateRandomString())
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-success').should('have.text', 'Email was scheduled to be send')
    })

})
