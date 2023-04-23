declare namespace Cypress {
    interface Chainable {
        register(user: Object): void;
        login(username: string, password: string): void;
    }
}