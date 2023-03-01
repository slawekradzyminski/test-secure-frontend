export const getUsersMocks = {
    mockUsers: () => {
        cy.intercept('GET', '**/users', {
            fixture: 'users.json',
            statusCode: 200
        })
    }
}