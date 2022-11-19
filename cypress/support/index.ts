import { User } from "../utils/user";

declare global {
    namespace Cypress {
        interface Chainable {
            register(user: User): void;
        }
    }
}