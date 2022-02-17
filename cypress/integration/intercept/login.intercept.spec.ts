/// <reference types="cypress" />

import HomePageAssertions from "../../assertions/homePageAssertions"
import LoginPage from "../../pages/loginPage"
import { getUser } from "../../util/userProvider"

const loginPage = new LoginPage()
const homePageAssertions = new HomePageAssertions()

const user = getUser()

describe('Login page with mocks', () => {
    beforeEach(() => {
        cy.visitWithNoMarketing(user, '')
    })

    it('should successfully login', () => {
        

        loginPage.login(user.username, user.password)
        homePageAssertions.verifyHeader(user.firstName)
    })

})
