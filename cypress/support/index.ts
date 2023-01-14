declare namespace Cypress {
    interface Chainable {
        login(username: string, password: string): void;
        register(user: Object): void;
    }
}