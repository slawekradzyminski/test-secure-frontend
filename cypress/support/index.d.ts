declare namespace Cypress {
    interface Chainable {
        getById(id: string): Chainable<JQuery<Element>>
        login(username: string, password: string): void
    }
}
