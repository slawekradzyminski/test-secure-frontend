declare namespace Cypress {
    interface Chainable {
      login(username: string, password: string): void;
      apiLogin(username: string, password: string): Promise<string>;
      register(username: string, password: string, firstName: string, lastName: string, email: string): void;
    }
  }