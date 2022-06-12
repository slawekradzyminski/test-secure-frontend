
export const succesfulDeleteUser = 'succesfulDeleteUser'
export const unsuccesfulDeleteUser = 'unsuccesfulDeleteUser'

export const mockSuccesfulDeleteUser = (username: string) => {
    cy.intercept('DELETE', `**/users/${username}`, { 
        statusCode: 204
     }).as(succesfulDeleteUser)
}

export const mockUnsuccesfulDeleteUser = (username: string) => {
    cy.intercept('DELETE', `**/users/${username}`, { 
        statusCode: 500
     }).as(unsuccesfulDeleteUser)
}