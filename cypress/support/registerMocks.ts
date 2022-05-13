Cypress.Commands.add('mockSuccessfulRegister', () => {
    cy.intercept('POST', '**/users/signup', {
        statusCode: 201,
        body: {
            token: 'fakeToken'
        }
    }).as('registerRequest')
})

Cypress.Commands.add('mockFailedRegister', (message) => {
    cy.intercept('POST', '**/users/signup', {
        statusCode: 422,
        body: {
            error: "Unprocessable Entity",
            message: message,
            path: "/users/signup",
            status: 422,
            timestamp: "2022-05-13T06:06:58.055+00:00"
        }
    })
})

Cypress.Commands.add('loadingIndicatorRegister', () => {
    cy.intercept('POST', '**/users/signup', {
        delay: 2000
    })
})