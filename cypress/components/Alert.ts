export default class Alert {

    static getSuccessAlert = () => cy.get('.alert-success')
    static getFailedAlert = () => cy.get('.alert-danger')

}