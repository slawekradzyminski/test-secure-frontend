import { getRandomUser } from "../../domain/user"
import GetAllUsersMocks from "../../mocks/GetAllUsersMocks"
import LoginMocks from "../../mocks/LoginMocks"
import HomePage from "../../pages/HomePage"
import LoginPage from "../../pages/LoginPage"

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
        LoginPage.getUsernameInput().type(user.username)
        LoginPage.getPasswordInput().type(user.password)
        LoginPage.getLoginButton().click()

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
        LoginPage.getUsernameInput().type(user.username)
        LoginPage.getPasswordInput().type(user.password)
        LoginPage.getLoginButton().click()

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
