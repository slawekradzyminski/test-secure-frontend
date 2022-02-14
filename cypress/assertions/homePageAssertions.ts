export default class HomePageAssertions {

    #header = 'h1'

    verifyHeader(firstName: string) {
        cy.get(this.#header).should('contain.text', `Hi ${firstName}`)
    }

}