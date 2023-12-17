/// <reference types="cypress" />

import { getLoginResponseFrom } from "../../domain/api/login"
import { getRandomUser } from "../../generator/userGenerator"
import users from "../../fixtures/users.json"
import { User } from "../../domain/user"
import { getUserMocks } from "../../mocks/getUserMocks"

let user: User

describe('Home page tests in isolation', () => {
    beforeEach(() => {
        user = getRandomUser()
        localStorage.setItem('user', JSON.stringify(getLoginResponseFrom(user)))
        cy.setCookie('token', 'fakeToken')
        getUserMocks.mockUsers()
        cy.visit('')
    })

    it('should display correct data', () => {
        cy.get('li').should('have.length', users.length)
        cy.get('li').each(($row, i) => {
            // Wolniejsza implementacja z cięzkim wrapem
            // cy.wrap($row).should('contain.text', `${users[i].firstName} ${users[i].lastName}`)
            expect($row.text()).to.contain(`${users[i].firstName} ${users[i].lastName}`)
        })
    })

})
