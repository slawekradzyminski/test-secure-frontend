
const url = '/users/signup'

export const stubSuccessfulRegister = () => {
    cy.intercept('POST', `**${url}`, {
        statusCode: 201,
        body: {
            token: 'fakeToken'
        }
    })
}

export const stubFailedRegister = (message: string) => {
    cy.intercept('POST', `**${url}`, {
        statusCode: 422,
        body: {
            error: "Unprocessable Entity",
            message: message,
            path: url,
            status: 422,
            timestamp: "2022-09-18T08:16:48.746+00:00"
        }
    })
}

export const stubDelay = () => {
    cy.intercept('POST', `**${url}`, {
        delay: 1000
    })
}
