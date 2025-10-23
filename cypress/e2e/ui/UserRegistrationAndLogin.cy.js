// UI: User registration and login
import { RegistrationPage, LoginPage, Header } from '../../pages/pages';

describe('User Registration and Login', () => {
  const reg = new RegistrationPage();
  const login = new LoginPage();
  const header = new Header();

  it('testUserRegistrationAndLogin', () => {
    const ts = Date.now();
    const username = `user_${ts}`;
    const email = `user_${ts}@example.com`;
    const password = 'Password123!';

    // Register
    reg.visit();
    reg.username().type(username);
    reg.email().type(email);
    reg.password().type(password);
    reg.submit().click();

    // Ensure logged in (profile visible)
    header.settings().should('be.visible');

    // Logout
    cy.uiLogout();

    // Login
    login.visit();
    login.email().type(email);
    login.password().type(password);
    login.submit().click();

    // Assert logged in
    header.settings().should('be.visible');
  });
});
