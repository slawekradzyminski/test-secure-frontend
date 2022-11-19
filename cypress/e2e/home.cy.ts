import { getRandomUser } from "../utils/user"

describe('home page tests', () => {
    beforeEach(() => {
        const user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.visit('/')
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

    // Kod wynikowy Cypressa
    // const user = getRandomUser()

    // cy.request({
    //     method: 'POST',
    //     url: 'http://localhost:4001/users/signup',
    //     body: user
    // })
    //     .then(() => {
    //         cy.request({
    //             method: 'POST',
    //             url: 'http://localhost:4001/users/signin',
    //             body: {
    //                 username: username,
    //                 password: password
    //             }
    //         })
    //             .then((resp) => {
    //                 localStorage.setItem('user', JSON.stringify(resp.body))
    //                 return resp
    //             })
    //             .then((resp) => {
    //                 cy.setCookie('token', resp.body.token)
    //             })
    //     })
    //     .then(() => cy.visit('/'))
    //     .then(() => cy.get('ul li').should('have.length.at.least', 1))

})
