import { User } from "../util/user"

declare global {
    namespace Cypress {
        interface Chainable {
            getById(id: string): Chainable<JQuery<Element>>
            login(username: string, password: string): void
            register(user: User): void
        }
    }
}
