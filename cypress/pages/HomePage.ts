class HomePage {

    verifyWelcomeMessageContains(firstName: string) {
        cy.get('h1').should('contain.text', firstName)
    }

}

export default HomePage