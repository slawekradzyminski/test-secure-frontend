Cypress.Commands.add('mockSuccessfulLogin', (user) => {
    cy.intercept('POST', '**/users/signin', {
        statusCode: 200,
        body: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            token: 'fakeJwtToken',
            email: user.email,
            roles: user.roles
        }
    }).as('loginRequest')
})

Cypress.Commands.add('mockFailedLogin', (message) => {
    cy.intercept('POST', '**/users/signin', {
        statusCode: 422,
        body: {
            error: "Unprocessable Entity",
            message: message,
            path: "/users/signin",
            status: 422,
            timestamp: "2022-05-12T13:28:20.286+00:00"
        }
    })
})

Cypress.Commands.add('mockLoginDelay', () => {
    cy.intercept('POST', '**/users/signin', {
        delay: 2000
    })
})