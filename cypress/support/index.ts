declare namespace Cypress {
    interface Chainable {
        loginToTestArena(email: string, password: string): void;
        login(username: string, password: string): void;
    }
}
