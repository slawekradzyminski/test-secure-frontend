declare namespace Cypress {
    interface Chainable {
        /**
         * login user via API and save response to localStorage
         */
        login(username: string, password: string): void;
        register(firstName: string, lastName: string, username: string, password: string, email: string): void;
    }
}