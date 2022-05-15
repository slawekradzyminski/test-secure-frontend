import { User } from "../util/user";

export default class EditPage {

    editUser(user: User) {
        cy.get('[name=firstName]').clear().type(user.firstName)
        cy.get('[name=lastName]').clear().type(user.lastName)
        cy.get('[name=email]').clear().type(user.email)
        cy.get('.btn-primary').click()
    }

}