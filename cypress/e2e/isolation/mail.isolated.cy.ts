/// <reference types="cypress" />

import { buildLoginResponse } from "../../utils/login"
import { User, getUser } from "../../utils/user"
import users from "../../fixtures/users.json"
import { getUsersMocks } from "../../mocks/getUsers"
import { homePage } from "../../pages/homePage"
import { getEmail } from "../../utils/email"
import { postEmailMocks } from "../../mocks/postEmail"
import { emailPage } from "../../pages/emailPage"
import Alert from "../../components/Alert"

describe('[ISOLATION] Home page tests', () => {

    let user: User

    beforeEach(() => {
        user = getUser()
        localStorage.setItem('user', JSON.stringify(buildLoginResponse(user)))
        cy.setCookie('token', 'fakeToken')
        getUsersMocks.mockSuccess()
        cy.visit('http://localhost:8081')
        homePage.selectors.userRowByName(users[0].firstName, users[0].lastName).find('.email').click()
    })

    it('should successfully send an email', () => {
        // given
        const email = getEmail()
        postEmailMocks.mockSuccess()

        // when
        emailPage.attemptSendingEmail(email)

        // then
        Alert.alertSuccess().should('contain.text', 'Email was scheduled to be send')
    })

})
