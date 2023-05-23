export const getUsersMocks = {

    mockSuccess: () => {
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
    }

}