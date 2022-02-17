/// <reference types="cypress" />

import HomePageAssertions from "../../assertions/homePageAssertions"
import LoginPage from "../../pages/loginPage"
import { getUser } from "../../util/userProvider"

const loginPage = new LoginPage()
const homePageAssertions = new HomePageAssertions()

const user = getUser()

describe('Login page with mocks', () => {
    const users = require("../../fixtures/users.json")

    beforeEach(() => {
        cy.visitWithNoMarketing(user, '')
    })

    it('should successfully login', () => {
        loginPage.login(user.username, user.password)
        homePageAssertions.verifyHeader(user.firstName)
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').first().should('contain.text', `${users[0].firstName} ${users[0].lastName}`)
    })

    it('should fail to login', () => {
        loginPage.login('wrong', 'wrong')
    })

})
