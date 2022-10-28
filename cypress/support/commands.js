Cypress.Commands.add('login', (username, password) => {
    // 1. Wysłać request na users/signin z usernamem i hasłem
    // 2. Musimy zapisać odpowiedź w localStorage pod kluczem user
    // 3. Musimy zapisać token z odpowiedzi jako ciastko o nazwie token
    // 4. Musimy wejść na stronę główną

    // 1
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: {
            username: username,
            password: password
        }
    }).then((odpowiedz) => {
        // 2
        localStorage.setItem('user', JSON.stringify(odpowiedz.body))
        // 3
        cy.setCookie('token', odpowiedz.body.token)
    })
})
