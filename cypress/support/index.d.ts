declare namespace Cypress {
    interface Chainable {
        getById(id: string): Chainable<JQuery<Element>>
        login(username: string, password: string): void
        register(username: string, password: string, firstName: string, lastName: string, email: string): void
    }
}
