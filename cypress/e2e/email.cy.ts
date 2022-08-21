/// <reference types="cypress" />

import { getRandomString } from "../util/random"
import { EmailMessage } from "../email/mailhogTypes"

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should send email', () => {
        // given
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()
        const emailSubject = getRandomString()
        const emailBody = getRandomString()

        cy.get('ul li').contains('Slawomir').find('.email').click()
        // when
        cy.get('[name=subject]').type(emailSubject)
        cy.get('[name=message]').type(emailBody)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-success').should('contain.text', 'Email was scheduled to be send')
        cy.request({
            method: 'GET',
            url: 'http://localhost:8025/api/v2/messages',
        }).then(resp => {
            expect(resp.status).to.eq(200)
            const mailhogResponse = resp.body as EmailMessage
            expect(mailhogResponse.count).to.be.greaterThan(0)

            const allSubjects = mailhogResponse.items
                .map(item => item.Content.Headers.Subject)
            expect(JSON.stringify(allSubjects)).to.contain(emailSubject)

            const allBodies = mailhogResponse.items
            .map(item => item.Content.Body)
            expect(JSON.stringify(allBodies)).to.contain(emailBody)
        })
    })


})
