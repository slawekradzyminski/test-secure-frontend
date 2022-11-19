import { getRandomUser } from "../utils/user"

describe('home page tests', () => {
    beforeEach(() => {
        const user = getRandomUser()
        cy.register(user)
        // 1. musimy wysłać request logowania
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: user.username,
                password: user.password
            }
        }).then((resp) => {
            // 2. musimy odpowiedź zapisać w localStorage
            localStorage.setItem('user', JSON.stringify(resp.body))
            // 3. musimy token z odpowiedzi zapisać w ciastku
            cy.setCookie('token', resp.body.token)
        })
        // 4. musimy wejść na stronę główną
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

})
