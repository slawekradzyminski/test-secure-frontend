import { getRandomUser, User } from "../domain/user"

describe('Home page tests', () => {
    let user: User
    let token: string

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password).then(jwtToken => {
            token = jwtToken
            cy.setCookie('token', jwtToken)
        })
        cy.visit('http://localhost:8081')
    })

// cy.request()
//  .then(resp => localStorage.setItem and return)
//  .then(jwtToken => przypisanie do naszego tokena)
//  .then(jwtToken => cy.setCookie())
//  .then(() => cy visit))
//  .then(() => cy.get(li))

    afterEach(() => {
        // cy.deleteUser(user.username, token)
    })

    it('should display at least one user', () => {
        cy.get('li', {
            timeout: 10000
        }).should('have.length.at.least', 1)
    })



    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should open add more page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
