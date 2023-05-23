export const postEmailMocks = {

    mockSuccess: () => {
        cy.intercept('POST', '**/email', { statusCode: 200 })
    }

}