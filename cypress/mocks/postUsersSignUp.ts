export const postUsersSignUpMocks = {

    mockSuccess: () => {
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        })
    },
    mockFailure: (errorMessage: string) => {
        cy.intercept('POST', '**/users/signup', {
            statusCode: 422,
            body: {
                timestamp: "2023-05-22T13:36:58.058+00:00",
                status: 422,
                error: "Unprocessable Entity",
                message: errorMessage,
                path: "/users/signin"
            }
        })
    }
}
