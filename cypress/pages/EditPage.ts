export default class EditPage {

    attemptEdit(newFirstName: string, newLastName: string, newEmail: string){
        cy.get('[name=firstName]').clear().type(newFirstName)
        cy.get('[name=lastName]').clear().type(newLastName)
        cy.get('[name=email]').clear().type(newEmail)
        cy.get('.btn-primary').click()
    }
   
}