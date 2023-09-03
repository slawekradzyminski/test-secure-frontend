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

Cypress.Commands.add('assertUserData', (username, token, user) => {
    cy.request({
        method: 'GET',
        url: `http://localhost:4001/users/${username}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((resp) => {
        expect(resp.body.firstName).to.equal(user.firstName)
        expect(resp.body.lastName).to.equal(user.lastName)
        expect(resp.body.email).to.equal(user.email)
        expect(resp.body.username).to.equal(username)
    })
})

Cypress.Commands.add('deleteUser', (username, token) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4001/users/${username}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((resp) => {
        expect(resp.status).to.eq(204)
    })
})
