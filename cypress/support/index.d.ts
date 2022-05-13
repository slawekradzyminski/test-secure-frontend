import { User } from "../util/user";

declare global {
    namespace Cypress {
        interface Chainable {
            // commands.js
            login(username: string, password: string): Promise<string>;
            register(user: User): void;
            deleteUser(username: string, token: string): void;

            // loginMocks.ts
            mockSuccessfulLogin(user: User): void;
            mockFailedLogin(message: string): void;
            mockLoginDelay(): void;

            // registerMocks.ts
            mockSuccessfulRegister(): void;
            mockFailedRegister(message: string): void;
            loadingIndicatorRegister(): void;
        }
    }
}