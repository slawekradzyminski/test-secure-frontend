/// <reference types="cypress" />

import { getLoginResponseFor } from "../../domain/http/login"
import { getRandomUser } from "../../generators/userGenerator"
import users from "../../fixtures/users.json"

describe('Home page tests', () => {
    beforeEach(() => {
        // 1. Zachowuje sobie odpowiedź w localStorage pod kluczem user
        // 2. Ustawia ciastko token ze zwróconym tokenem

        const user = getRandomUser()
        // 1
        localStorage.setItem('user', JSON.stringify(getLoginResponseFor(user)))
        // 2
        cy.setCookie('token', 'fakeToken')
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('http://localhost:8081')
    })

    it('should correctly display all users', () => {
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($el, i) => {
            expect($el).to.contain.text(`${users[i].firstName} ${users[i].lastName}`);
        })
    })
    

})
