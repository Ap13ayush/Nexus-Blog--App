// UI: User registration and login
import { RegistrationPage, LoginPage, Header } from '../../modules/ui/pages';
import { makeUser, stubSignup, stubLogin, stubSession } from '../../modules/stubs/network';

describe('User Registration and Login (stubbed API)', () => {
  const reg = new RegistrationPage();
  const login = new LoginPage();
  const header = new Header();

  it('testUserRegistrationAndLogin', () => {
    const user = makeUser();

    // Stub sign up API
    stubSignup(user);
    reg.visit();
    reg.username().type(user.username);
    reg.email().type(user.email);
    reg.password().type('Password123!');
    reg.submit().click();

    // App requests current user
    stubSession(user);

    // Ensure logged in (settings visible)
    header.settings().should('be.visible');

    // Logout
    cy.uiLogout();

    // Stub login API
    stubLogin(user);
    login.visit();
    login.email().type(user.email);
    login.password().type('Password123!');
    login.submit().click();

    // App requests current user after login
    stubSession(user);

    // Assert logged in
    header.settings().should('be.visible');
  });
});
