export const getElement = (name: string) => {
    return () => {
        return cy.get(name)
    }
}
