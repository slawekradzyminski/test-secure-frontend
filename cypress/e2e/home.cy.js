/// <reference types="cypress" />

import { email, password } from "../util/credentials"

describe('Home tests', () => {
  beforeEach(() => {
    // 1. Musimy wysłać GETa do test areny na http://demo.testarena.pl/zaloguj
    // 2. Odpowiedź parsujemy jako HTML i bierzemy sobie csrfa
    // 3. Musimy wysłać formularz na http://demo.testarena.pl/logowanie z danymi do logowania i csrfem z kroku drugiego

    // 1
    cy.request('http://demo.testarena.pl/zaloguj')
      .its('body')
      .then((body) => {
        // 2
        const $html = Cypress.$(body)
        const csrf = $html.find('#csrf').val()

        // 3
        cy.request({
          method: 'POST',
          url: 'http://demo.testarena.pl/logowanie',
          form: true,
          body: {
            email: email,
            password: password,
            login: 'Zaloguj',
            remember: 0,
            csrf: csrf
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
