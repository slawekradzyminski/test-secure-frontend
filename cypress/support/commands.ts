Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: { username, password }
    }).then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.body))
        cy.setCookie('token', resp.body.token)
    })
})