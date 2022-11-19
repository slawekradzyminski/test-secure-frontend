import { getRandomUser, User } from "../utils/user"

describe('home page tests', () => {
    let user: User
    let token: string

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(returnedToken => { 
            token = returnedToken 
            cy.setCookie('token', returnedToken)
        })
        cy.visit('/')
    })

    afterEach(() => {
        cy.deleteUser(user.username, token)
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', 'add-user')
    })

})
