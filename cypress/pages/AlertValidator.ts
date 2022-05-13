export default class AlertValidator {

    private _alert = '.alert'

    verifySuccess(message: string) {
        cy.get(this._alert)
            .should('contain.text', message)
            .should('have.class', 'alert-success')
    }

    verifyFailure(message: string) {
        cy.get(this._alert)
            .should('contain.text', message)
            .should('have.class', 'alert-danger')
    }

}