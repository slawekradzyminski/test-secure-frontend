import { User } from "../domain/user";

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): Promise<string>;
            register(user: User): void;
            deleteUser(username: string, token: string): void;
            visitHomePageAsLoggedInUser(): void;
        }
    }
}
