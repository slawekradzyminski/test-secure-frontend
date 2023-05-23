export default class Alert {

    static alertSuccess = () => cy.get('.alert-success')
    static alertFailure = () => cy.get('.alert-danger')

}