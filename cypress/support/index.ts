declare namespace Cypress {
    interface Chainable {
        /**
         * Login the new user to the application
         * @param username 
         * @param password 
         */
        login(username: string, password: string): void;
    }
}