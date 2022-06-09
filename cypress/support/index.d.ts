  declare namespace Cypress {
    interface Chainable {
      mount(component: React.Component, path: string, options: object): void;
  }
}