export const createSelector = (name: string) => {
    return () => {
        return cy.get(name)
    }
}
