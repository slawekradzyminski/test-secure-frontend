export const mailScreen = {
    selectors: {
        emailInput: () => cy.get('[name="email"]'),
        subjectInput: () => cy.get('[name=subject]'),
        messageInput: () => cy.get('[name=message]'),
        sendEmailButton: () => cy.get('.btn-primary')
    },

    sendEmail: (subject, message) => {
        mailScreen.selectors.subjectInput().type(subject)
        mailScreen.selectors.messageInput().type(message)
        mailScreen.selectors.sendEmailButton().click()
    }
}
