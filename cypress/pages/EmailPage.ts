export const EditPage = {

    selectors: {
        getSubjectInput: () => cy.get('[name=subject]'),
        getTextInput: () => cy.get('[name=message]'),
        getEmailButton: () => cy.get('.btn-primary')
    }

}