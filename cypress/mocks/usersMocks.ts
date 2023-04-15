export const usersMocks = {

    testUsers: () => {
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
    }

}