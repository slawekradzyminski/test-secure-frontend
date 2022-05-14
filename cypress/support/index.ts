import { User } from "../util/user";

declare global {
    namespace Cypress {
      interface Chainable {
        register(user: User): void;
      }
    }
  }