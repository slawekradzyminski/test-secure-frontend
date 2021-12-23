import LoginPage from "../pages/LoginPage"
import { getRandomString } from "../util/random";

describe('login page', () => {

    const loginPage = new LoginPage()
    let jwtToken: string;

    beforeEach(() => {
        const username = getRandomString()
        const password = getRandomString()

        cy.request('POST', 'http://localhost:4000/users/signup', {
            email: `${getRandomString()}@gmail.com`,
            firstName: getRandomString(),
            lastName: getRandomString(),
            password: password,
            roles: ['ROLE_CLIENT'],
            username: username
        }).then(resp => {
            expect(resp.status).to.eq(201);
        })

        cy.request('POST', 'http://localhost:4000/users/signin', {
            password: password,
            username: username
        }).then(resp => {
            expect(resp.status).to.eq(200)
            jwtToken = resp.body.token
            window.localStorage.setItem('user', JSON.stringify(resp.body))
        })
    })

    it('displays two todo items by default', () => {
        cy.request({
            url: 'http://localhost:8080',
            auth: {
                bearer: jwtToken
            }
        }).then(resp => {
            expect(resp.status).to.eq(200)
        })

        cy.visit('http://localhost:8080')

        cy.get('h1').should('contain.text', '!')
    })

})
