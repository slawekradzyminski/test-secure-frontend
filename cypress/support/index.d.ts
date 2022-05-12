import { User } from "../util/user";

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * login user via API and save response to localStorage
             */
            login(username: string, password: string): void;
            register(user: User): void;
        }
    }
}