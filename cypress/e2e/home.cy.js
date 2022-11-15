/// <reference types="cypress" />

describe('Home tests', () => {
    beforeEach(() => {
        cy.request('http://demo.testarena.pl/zaloguj')
            .its('body')
            .then((body) => {
                const $html = Cypress.$(body)
                const csrf = $html.find('input[name=csrf]').val()

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
                    .then((resp) => {
                        expect(resp.status).to.eq(200)
                    })
            })
        cy.visit('http://demo.testarena.pl')
    })

    it('should display 10 items in sidebar', () => {
        cy.get('.menu > li').should('have.length', 10)
    })

    it('should logout', () => {
        cy.get('.header_logout').click()
        cy.url().should('contain', 'zaloguj')
        cy.get('#login').should('exist')
    })

})
