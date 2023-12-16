import { User } from "../domain/user";

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Login the new user via API
             */
            login(username: string, password: string): Promise<string>;

            /**
             * Register new user via API
             */
            register(user: User): void;
        }
    }
}