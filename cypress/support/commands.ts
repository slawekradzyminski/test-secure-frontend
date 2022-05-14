import { User } from "../util/user";

Cypress.Commands.add('register', (user: User) => { 
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email,
            roles: user.roles
        }
    }).then(resp => {
        expect(resp.status).to.eq(201)
    })
 })

 Cypress.Commands.add('login', (username: string, password: string) => { 
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: username,
                password: password
            }
        }).then(resp => {
            expect(resp.status).to.eq(200)
            localStorage.setItem('user', JSON.stringify(resp.body))
            return resp.body.token
        })
 })

 Cypress.Commands.add('deleteUser', (username: string, token: string) => { 
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4001/users/${username}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(resp => {
        expect(resp.status).to.eq(204)
    })
})
