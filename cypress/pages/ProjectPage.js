export default class ProjectPage {

    static getSearchInput = () => cy.get('#search')
    static getSearchButton = () => cy.get('#j_searchButton')
    static getFirstCell = () => cy.get('tbody tr td:nth-of-type(1)')
    static getButtonLinks = () => cy.get('.button_link')

}