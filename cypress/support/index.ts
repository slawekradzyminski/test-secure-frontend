import { User } from "../util/userProvider";

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): void;
            register(user: User): void;
        }
    }
}
