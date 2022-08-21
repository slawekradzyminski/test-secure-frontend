/// <reference types="cypress" />

import { getRandomString } from "../util/random"
import { EmailMessage } from "../email/mailhogTypes"
import { recurse } from 'cypress-recurse'

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

        cy.intercept('GET', '**/api/v2/messages', {
            statusCode: 200,
            body: {}
        })

        // then
        cy.get('.alert-success').should('contain.text', 'Email was scheduled to be send')
        recurse(
            () => cy.request({ url: 'http://localhost:8025/api/v2/messages' }),
            (resp) => {
                expect(resp.status).to.eq(200)
                const mailhogResponse = resp.body as EmailMessage
                expect(mailhogResponse.count).to.be.greaterThan(0)

                const allSubjects = mailhogResponse.items
                    .map(item => item.Content.Headers.Subject)
                    .flat()

                const allBodies = mailhogResponse.items
                    .map(item => item.Content.Body)
                    .flat()

                return allSubjects.includes(emailSubject) && allBodies.includes(emailBody)
            },
            {
                log: true,
                limit: 50, // max number of iterations
                timeout: 30000, // time limit in ms
                delay: 500, // delay before next iteration, ms
              }
        )
    })


})
