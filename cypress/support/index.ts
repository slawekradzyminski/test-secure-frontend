declare namespace Cypress {
    interface Chainable {
        /**
         * login user via API.
         * 
         * Ask Sławek for details :)
         */
        login(username: string, password: string): void // rozszerzamy metody widoczne za cy.

    }
} 