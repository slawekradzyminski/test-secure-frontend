Cypress.Commands.add('login', (username, password) => {
    // 1 - wysyłamy request logowania na users/signin
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: { username, password }
    }).then(resp => {
        // 2 - odpowiedź zapisujemy w localStorage pod kluczem user
        localStorage.setItem('user', JSON.stringify(resp.body))
        return resp.body.token
    })
})

Cypress.Commands.add('register', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: user
    })
})

