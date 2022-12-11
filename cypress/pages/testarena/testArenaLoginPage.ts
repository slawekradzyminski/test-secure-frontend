export const testArenaLoginPage = {

    attemptLogin: (username: string, password: string) => {
        cy.get("#email").type(username)
        cy.get("#password").type(password)
        cy.get('#save').click()
    }

}