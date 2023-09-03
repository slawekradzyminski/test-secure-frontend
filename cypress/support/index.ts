declare namespace Cypress {
    interface Chainable {
        // commands.js
        login(username: string, password: string): void;
        register(user: object): void;

        // testarenacommands.js
        loginToTestArena(email: string, password: string): void;
    }
}