import { Alert } from "../../components/Alert"
import { getRandomUser } from "../../domain/user"
import { RegisterPage } from "../../pages/RegisterPage"
import { getRandomString, getRandomEmail } from "../../util/random"

describe('Register page tests in isolation', () => {

    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        const user = getRandomUser()
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        })

        RegisterPage.attemptRegister(user)

        Alert.getAlertSuccess().should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

})
