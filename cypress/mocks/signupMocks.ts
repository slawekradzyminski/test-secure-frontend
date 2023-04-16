const signupEndpoint = '**/signup'

export const signupMocks = {
    successfulRegister: () => {
        cy.intercept('POST', '**/signup', { statusCode: 201 })
            .as('registerRequest')
    },

    userAlreadyExists: (message: string) => {
        cy.intercept('POST', signupEndpoint, {
            statusCode: 422,
            body: {
                error: 'Unprocessable Entity',
                message: message,
            },
        })
    }
}