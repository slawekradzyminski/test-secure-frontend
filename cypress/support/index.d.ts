declare namespace Cypress {
    interface Chainable {
        login(username: string, password: string): void;
        register(firstName: string, lastName: string, username: string, password: string, email: string): void;
    }
}