export default class Alert {

    static getSuccessAlert = () => cy.get('.alert-success')
    static getFailureAlert = () => cy.get('.alert-danger')
    
}