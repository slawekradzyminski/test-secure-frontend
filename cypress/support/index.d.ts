import { User } from "../util/userProvider";

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): Promise<string>;
            register(user: User): void;
            deleteUser(username: string, token: string): void;
            visitWithNoMarketing(user: User, url: string): void;
        }
    }
}