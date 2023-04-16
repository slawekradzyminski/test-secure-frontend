/// <reference types="cypress" />

Cypress.Commands.add('loginByCSRF', (csrfToken) => {
    cy.request({
        method: 'POST',
        url: 'http://demo.testarena.pl/logowanie',
        form: true,
        body: {
            email: 'administrator@testarena.pl',
            password: 'sumXQQ72$L',
            login: 'Zaloguj',
            remember: 0,
            csrf: csrfToken
        },
    })
})

describe('Home page', () => {
    beforeEach(() => {
        cy.request('http://demo.testarena.pl/zaloguj')
            .its('body')
            .then((body) => {
                const $html = Cypress.$(body)
                const csrf = $html.find('#csrf').val()

                cy.loginByCSRF(csrf)
            })
        cy.visit('http://demo.testarena.pl/')
    })

    it('should display logged in page', () => {
        cy.get('[title=Wyloguj]').should('be.visible')
    })

})
