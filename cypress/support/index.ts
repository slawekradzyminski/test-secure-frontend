declare namespace Cypress {
    interface Chainable {
        loginToTestArena(email: string, password: string): void;
    }
}
