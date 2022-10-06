import { Alert } from "../../components/Alert"
import { RegisterPage } from "../../pages/RegisterPage"
import { getRandomString, getRandomEmail } from "../../util/random"

describe('Register page tests in isolation', () => {

    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {

        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        })

        RegisterPage.selectors.getUsernameInput().type(getRandomString())
        RegisterPage.selectors.getPasswordInput().type(getRandomString())
        RegisterPage.selectors.getFirstNameInput().type(getRandomString())
        RegisterPage.selectors.getEmailInput().type(getRandomEmail())
        RegisterPage.selectors.getLastNameInput().type(getRandomString())
        RegisterPage.selectors.getRegisterButton().click();

        Alert.getAlertSuccess().should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

})
