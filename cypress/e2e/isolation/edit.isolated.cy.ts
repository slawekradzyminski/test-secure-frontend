/// <reference types="cypress" />

import { getRandomUser } from "../../domain/user"
import { getUsersMocks } from "../../mocks/getUsersMocks"
import { buildLoginResponse } from "../../mocks/postUserSignin"
import users from "../../fixtures/users.json"

describe('Home page tests', () => {
    beforeEach(() => {
        const user = getRandomUser()
        cy.setCookie('token', 'fakeToken')
        localStorage.setItem('user', JSON.stringify(buildLoginResponse(user)))
        getUsersMocks.mockUsers()
        cy.visit('http://localhost:8081')
        cy.get('li').contains(`${users[0].firstName}`).find('.edit').click()
    })

    it('should successfully edit user', () => {
    })

})
