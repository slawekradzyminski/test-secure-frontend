/// <reference types="cypress" />

describe('Iframe', () => {
    beforeEach(() => {
        cy.visit('./iframe.html')
    })

    const getIframeDocument = () => {
        return cy
            .get('iframe[data-cy="the-frame"]')
            .its('0.contentDocument').should('exist')
    }

    const getIframeBody = () => {
        return getIframeDocument()
            .its('body').should('not.be.undefined')
            .then(cy.wrap)
    }

    it('gets the post', { baseUrl: null }, () => {
        getIframeBody().find('#run-button').should('have.text', 'Try it').click()
        getIframeBody().find('#result').should('include.text', '"delectus aut autem"')
    })

})
