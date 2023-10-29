Cypress.Commands.add('loginToTestArena', (email, password) => {
    cy.visit('http://demo.testarena.pl/zaloguj')
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('#login').click()
    cy.get('#header_logo').should('be.visible')
})

Cypress.Commands.add('login', (username, password) => {
    // 1 - wysłać request logowania
    // 2 - ustawić odpowiedź w localStorage pod kluczem user
    // 3 - ustawić ciastko token z wartością tokena jwt

    // 1
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin', 
        body: {
            username: username,
            password: password,
        },
    }).then((response) => {
        // 2
        localStorage.setItem('user', JSON.stringify(response.body))

        // 3
        cy.setCookie('token', response.body.token)
    })
    cy.visit('http://localhost:8081')
})

Cypress.Commands.add('register', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: user
    })
})