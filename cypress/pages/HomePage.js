class HomePage  {

    logoutButton = '#logout'
    addMoreButton = '#addmore'
    userRow = 'ul li'

    clickLogout() {
        cy.get(this.logoutButton).click()
    }

    clickAddMore() {
        cy.get(this.addMoreButton).click()
    }

    verifyNumberOfUsersDisplayedIsAtLeast(numberOfUsers) {
        cy.get(this.userRow).should('have.length.at.least', numberOfUsers)
    }

}

export default HomePage