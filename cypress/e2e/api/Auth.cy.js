// API: Auth login to get token

describe('API Auth', () => {
  it('logs in and stores JWT', () => {
    const email = `seed_${Date.now()}@example.com`;
    const password = 'Password123!';

    // Create user first
    cy.request('POST', `${Cypress.env('apiBaseUrl')}/users`, {
      user: { username: `seed_${Date.now()}`, email, password }
    }).its('status').should('eq', 201);

    // Login
    cy.request('POST', `${Cypress.env('apiBaseUrl')}/users/login`, {
      user: { email, password }
    }).then((res) => {
      expect(res.status).to.eq(200);
      const token = res.body.user.token;
      expect(token).to.be.a('string');
      Cypress.env('token', token);
    });
  });
});
