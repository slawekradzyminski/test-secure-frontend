import { User } from "../utils/user";

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): Chainable<null>;
            register(user: User): void;
        }
    }
}
