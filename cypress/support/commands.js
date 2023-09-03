Cypress.Commands.add('login', (username, password) => {
    // 1. Musimy wysłać request logowania
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: {
            username: username,
            password: password
        }
    }).then((resp) => {
        // 2. Zapisujemy odpowiedź w localStorage pod kluczem user
        localStorage.setItem('user', JSON.stringify(resp.body))

        // 3. Zapisujemy token z odpowiedzi jako ciastko o nazwie token
        cy.setCookie('token', resp.body.token)
    })
})

Cypress.Commands.add('register', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: user
    })
})
