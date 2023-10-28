/// <reference types="cypress" />

import { getRandomEmail } from "../generator/email"

describe('Email page tests', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
        cy.get('li').contains('Gosia Radzyminska').find('.email').click()
    })

    it('should successfully send an email', () => {
        const email = getRandomEmail()
        cy.get('[name=subject]').type(email.subject)
        cy.get('[name=message]').type(email.message)
        cy.get('.btn-primary').click()

        cy.get('.alert-success').should('contain.text', 'Email was scheduled to be send')
    })

})
