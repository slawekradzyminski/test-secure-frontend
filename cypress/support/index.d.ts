import { User } from "../util/user";

declare global {
    namespace Cypress {
        interface Chainable {
            // apiCommands.js
            login(username: string, password: string): Promise<string>;
            register(user: User): void;
            delete(username: string, token: string): void;

            // isolationCommands.js
            setUserInLocalStorage(): void;
        }
    }
}