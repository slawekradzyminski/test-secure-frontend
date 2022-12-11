/// <reference types="cypress" />

import { faker } from "@faker-js/faker"

describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get("#email").type('administrator@testarena.pl')
        cy.get("#password").type('sumXQQ72$L')
        cy.get('#save').click()
    })

    it('should add new msg', () => {
        const msg = faker.lorem.paragraph()
        cy.get("a[title='Wiadomości']").click()
        cy.get("#j_msgContent").type(msg)
        cy.get("#j_msgResponse-193").click()
        cy.get("div.message_content_text").contains(msg)
    })

})
