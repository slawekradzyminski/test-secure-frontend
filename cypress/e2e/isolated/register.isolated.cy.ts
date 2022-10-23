import Alert from "../../components/Alert"
import { errorMessage, generateRegisterResponse } from "../../domain/register"
import { Roles } from "../../domain/roles"
import { getRandomUser } from "../../domain/user"

describe('Register tests with mocks', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        }).as('registerRequest')
        const user = getRandomUser()

        cy.get('input[name=username]').type(user.username)
        cy.get('input[name=password]').type(user.password)
        cy.get('input[name=firstName]').type(user.firstName)
        cy.get('input[name=lastName]').type(user.lastName)
        cy.get('input[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        Alert.getSuccessAlert().should('contain.text', 'Registration successful')
        cy.wait('@registerRequest').its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: [Roles.ROLE_CLIENT]
        })
    })

    it('should fail to login', () => {
        cy.intercept('POST', '**/users/signup', {
            statusCode: 422,
            body: generateRegisterResponse()
        })

        const user = getRandomUser()

        cy.get('input[name=username]').type(user.username)
        cy.get('input[name=password]').type(user.password)
        cy.get('input[name=firstName]').type(user.firstName)
        cy.get('input[name=lastName]').type(user.lastName)
        cy.get('input[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.scrollTo('top')
        Alert.getFailedAlert().should('contain.text', errorMessage)
    })

})
