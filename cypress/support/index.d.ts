    declare namespace Cypress {
        interface Chainable {
            apiLogin(username: string, password: string): Promise<string>;
        }
    }