export default class Alert {

    static getAlertSuccess = () => cy.get('.alert-success')
    static getAlertFailure = () => cy.get('.alert-danger')

}