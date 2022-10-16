export default class Alert {

    static getAlertSuccess = () => cy.get('.alert-success')
    static getAlertFailed = () => cy.get('.alert-danger')

}