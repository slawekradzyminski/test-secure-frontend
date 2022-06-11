Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: {
            username: username,
            password: password 
        }
    }).then(response => {
        expect(response.status).to.eq(200)
        localStorage.setItem('user', JSON.stringify(response.body))
    })
})