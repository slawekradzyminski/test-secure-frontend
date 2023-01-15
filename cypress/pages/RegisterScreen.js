export default class RegisterScreen {
    static getHeader = () => cy.get('h2');
    static getFirstNameInput = () => cy.get('[name="firstName"]');
    static getLastNameInput = () => cy.get('[name="lastName"]');
    static getUsernameInput = () => cy.get('[name="username"]');
    static getPasswordInput = () => cy.get('[name="password"]');
    static getEmailInput = () => cy.get('[name="email"]');
    static getRegisterButton = () => cy.get('.btn-primary');
 
    static registerUser = (user) => {
        RegisterScreen.getFirstNameInput().type(user.firstName);
        RegisterScreen.getLastNameInput().type(user.lastName);
        RegisterScreen.getUsernameInput().type(user.username);
        RegisterScreen.getPasswordInput().type(user.password);
        RegisterScreen.getEmailInput().type(user.email);
        RegisterScreen.getRegisterButton().click();
    };
}
