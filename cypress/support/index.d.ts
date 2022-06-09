import { MountOptions } from "cypress/react";

  declare namespace Cypress {
    interface Chainable {
      mount(component: React.ReactNode, path: string, options?: MountOptions): void;
  }
}