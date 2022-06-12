export const mockUsers = () => {
    cy.intercept('GET', '**/users', { fixture: 'users.json' })
}