export default class GetAllUsersMocks {
    static mockUsers() {
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
    }
}