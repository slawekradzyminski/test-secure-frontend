export default class MockRegister {

    private static url = '/users/signup'

    static mockSuccessfulRegister() {
        cy.intercept('POST', `**${this.url}`, {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        })
    }

    static mockFailedRegister(message: string) {
        cy.intercept('POST', `**${this.url}`, {
            statusCode: 422,
            body: {
                error: "Unprocessable Entity",
                message: message,
                path: this.url,
                status: 422,
                timestamp: "2022-09-18T08:16:48.746+00:00"
            }
        })
    }

    static mockDelayedRegister() {
        cy.intercept('POST', `**${this.url}`, {
            delay: 1000
        })
    }

}