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
        })
        const user = getRandomUser()

        cy.get('input[name=username]').type(user.username)
        cy.get('input[name=password]').type(user.password)
        cy.get('input[name=firstName]').type(user.firstName)
        cy.get('input[name=lastName]').type(user.lastName)
        cy.get('input[name=email]').type(user.email)
        cy.get('.btn-primary').click()

        cy.get('.alert-success').should('contain.text', 'Registration successful')
    })

})
