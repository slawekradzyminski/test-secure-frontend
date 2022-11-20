export default class UsersMock {

    static mockUsers = () => cy.intercept('GET', '**/users', { statusCode: 200, fixture: 'users.json' })

}