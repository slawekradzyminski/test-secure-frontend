export const registerMocks = {

    mockSuccessfulRegister: () => {
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201,
            body: {
                token: 'fakeToken'
            }
        }).as('registerRequest')
    }

}