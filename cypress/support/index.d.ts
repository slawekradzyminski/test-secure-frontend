declare namespace Cypress {
    interface Chainable {
        getById(id: string): Chainable<JQuery<Element>> 
    }
}
