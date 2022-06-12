
export const succesfulEditUser = 'succesfulEditUser'

export const mockSuccesfulEditUser = (username: string) => {
    cy.intercept("PUT", `**/users/${username}`, {
        statusCode: 200,
    }).as(succesfulEditUser)
}