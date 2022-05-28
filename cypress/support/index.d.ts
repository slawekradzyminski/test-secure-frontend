/// <reference types="cypress" />

import { User } from "../util/user";

declare global {
    namespace Cypress {
      interface Chainable {
        login(user: User): void;
      }
    }
  }