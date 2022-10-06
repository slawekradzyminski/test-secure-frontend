import { Alert } from "../../components/Alert"
import { EditPage } from "../../pages/EmailPage"
import { getRandomString } from "../../util/random"

describe('Email page tests in isolation', () => {
    beforeEach(() => {
        cy.visitHomePageAsLoggedInUser()
        cy.get('.email').first().click()
    })

    it('should send email', () => {
        // given
        cy.intercept('POST', '**/email', { statusCode: 200 })

        // when
        EditPage.selectors.getSubjectInput().type(getRandomString())
        EditPage.selectors.getTextInput().type(getRandomString())
        EditPage.selectors.getEmailButton().click()

        // then
        Alert.getAlertSuccess().should('have.text', 'Email was scheduled to be send')
    })

})
