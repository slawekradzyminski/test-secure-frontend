export default class AlertsValidator {

    private _alert = '.alert'

    verifySuccess(message: string) {
        cy.get(this._alert)
            .should('have.text', message)
            .and('have.class', 'alert-success')
    }

    verifyFailure(message: string) {
        cy.get(this._alert)
            .should('have.text', message)
            .and('have.class', 'alert-danger')
    }

}