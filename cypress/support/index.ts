declare namespace Cypress {
    interface Chainable {
        // commands.js
        login(username: string, password: string): void;
        register(user: object): void;
        assertUserData(username: string, token: string, user: object): void;

        // testarenacommands.js
        loginToTestArena(email: string, password: string): void;
    }
}