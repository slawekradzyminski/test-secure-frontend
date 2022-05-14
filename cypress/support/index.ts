import { User } from "../util/user";

declare global {
    namespace Cypress {
        interface Chainable {
            register(user: User): void;
            login(username: string, password: string): Promise<string>;
            deleteUser(username: string, token: string): void;
        }
    }
}