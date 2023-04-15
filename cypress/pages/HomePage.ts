export default class HomePage {

    static getUserRow = () => cy.get('li')
    static getLogoutLink = () => cy.get('#logout')
    static getAddMoreLink = () => cy.get('#addmore')

}