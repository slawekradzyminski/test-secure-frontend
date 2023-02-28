import { faker } from '@faker-js/faker';

/// <reference types="cypress" />

describe('Testarena training', () => {
    const message = faker.random.alphaNumeric(10)

    beforeEach(() => {
        // 1. Wejście na testarenę i pobranie csrfa
        cy.request({
            method: 'GET',
            url: 'http://demo.testarena.pl/zaloguj'
        }).then((resp) => {
            const $html = Cypress.$(resp.body)
            const csrf = $html.find('#csrf').val()

            // 2. Wysłanie formularza
            cy.request({
                method: 'POST',
                url: 'http://demo.testarena.pl/logowanie',
                form: true, 
                body: {
                    email: 'administrator@testarena.pl',
                    password: 'sumXQQ72$L',
                    remember: 0,
                    login: 'Zaloguj',
                    csrf: csrf,
                },
            })
        })

        cy.visit('http://demo.testarena.pl/')
    })

    it('should add new message', () => {
        cy.get('.icon_mail').click()
        cy.get('#j_msgContent').type(message)
        cy.get('#j_msgResponse-193').click()
        cy.get('.message_content_text').should('contain', message)
    })

})
