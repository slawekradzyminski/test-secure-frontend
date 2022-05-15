export default class HomePage {

    attemptDelete(firstName: string, lastName: string) {
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.delete').click()
    }

    clickUserDetails(firstName: string, lastName: string) {
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.edit').click()
    }

}