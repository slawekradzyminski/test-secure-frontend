declare namespace Cypress {
    interface Chainable {
        // my app
        login(username: string, password: string): void;
        registerViaAPI(user: object): void;
        loginViaAPI(user: object): void;


        // testarena
        loginToTestArena(username: string, password: string): void;
    }
}