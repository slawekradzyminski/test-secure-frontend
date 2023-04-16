export default class HomePage {

    static selectors = {
        getUserRow: () => cy.get('li'),
        getLogoutLink: () => cy.get('#logout'),
        getAddMoreLink: () => cy.get('#addmore')
    }

    static verifyNumberOfUsers = (noOfUsers: number) => {
        this.selectors.getUserRow().should('have.length', 2)
    }

}