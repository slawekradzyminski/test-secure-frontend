import { homePage } from "../pages/homePage"
import { emailPage } from "../pages/emailPage"
import { getRandomEmail } from "../utils/mail"
import { getRandomUser } from "../utils/user"

describe('Send email', () => {
    let user

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.visit('http://localhost:8081')
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()
    })

    it('sholud succssfully send email', () => {
        // given
        const email = getRandomEmail()
        homePage.clickMailUser(user.firstName)

        // when
        emailPage.attemptSendEmail(email)

        // then
        cy.get('.alert-success').should('have.text', 'Email was scheduled to be send')
    })
})