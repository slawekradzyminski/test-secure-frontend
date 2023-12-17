export const getUserMocks = {

    mockUsers: () => {
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
    }

}