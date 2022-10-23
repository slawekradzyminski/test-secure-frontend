import { getRandomUser } from "../../domain/user"
import GetAllUsersMocks from "../../mocks/GetAllUsersMocks"
import LoginMocks from "../../mocks/LoginMocks"
import HomePage from "../../pages/HomePage"
import { loginPage } from "../../pages/loginPageObject"

describe('Login page tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        LoginMocks.mockSuccessfulLogin(user)
        GetAllUsersMocks.mockUsers()

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        HomePage.getHeader().should('contain.text', user.firstName)
        cy.wait('@loginRequest').its('request.body').should('deep.equal', {
            username: user.username,
            password: user.password
        })
    })

    it('should display loading indicator', () => {
        // given
        const user = getRandomUser()
        LoginMocks.mockDelayedLogin()

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
