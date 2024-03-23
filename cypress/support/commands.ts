Cypress.Commands.add('login', (username, password) => {
    // 1. Wysyła request logowania na http://localhost:4001/users/signin
    // 2. Zachowuje sobie odpowiedź w localStorage pod kluczem user
    // 3. Ustawia ciastko token ze zwróconym tokenem
    // 4. Dopiero później robimy cy.visit na stronę główną

    // 1.
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: {
            username: username,
            password: password,
        },
    }).then(resp => {
        // 2
        localStorage.setItem('user', JSON.stringify(resp.body))
        // 3
        cy.setCookie('token', resp.body.token)
    })
    cy.visit('http://localhost:8081')
})

Cypress.Commands.add('register', (user) => {
    cy.request({
        url: 'http://localhost:4001/users/signup',
        method: 'POST',
        body: user
    })
})

Cypress.Commands.add('deleteUser', (username, token) => {
    cy.request({
        url: `http://localhost:4001/users/${username}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
})
