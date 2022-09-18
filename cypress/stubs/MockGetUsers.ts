export default class MockGetUsers {

    static mockUsers() {
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
    }

}