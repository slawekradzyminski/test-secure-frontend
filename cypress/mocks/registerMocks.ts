export const mockSuccesfulRegister = () => {
    cy.intercept('POST', '**/users/signup', {
        statusCode: 201,
        body: {
            token: "fakeToken"
        }
    }).as('registerRequest')
}

export const mockUserAlreadyExists = () => {
    cy.intercept('POST', '**/users/signup', {
        statusCode: 422,
        body: {
            timestamp: "2022-07-01T06:41:10.395+00:00",
            status: 422,
            error: "Unprocessable Entity",
            message: "Username is already in use",
            path: "/users/signup"
        }
    })
}