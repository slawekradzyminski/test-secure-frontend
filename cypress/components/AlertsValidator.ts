export default class AlertsValidator {

    private _alert = '.alert'

    checkSuccess(text: string) {
        cy.get(this._alert).should('contain.text', text)
            .and('have.class', 'alert-success')
    }

    checkFailure(text: string) {
        cy.get(this._alert).should('contain.text', text)
            .and('have.class', 'alert-danger')
    }
}