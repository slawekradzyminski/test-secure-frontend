export const getAllUsersMocks = {
    mockUsers: () => {
        cy.intercept('GET', '**/users', {
            statusCode: 200,
            fixture: 'users.json'
        })
    }
}