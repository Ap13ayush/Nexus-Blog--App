// Custom Cypress commands

Cypress.Commands.add('setJwt', (token) => {
  window.localStorage.setItem('jwt', token);
});

Cypress.Commands.add('apiLogin', (email, password) => {
  const apiBase = Cypress.env('apiBaseUrl');
  return cy.request('POST', `${apiBase}/users/login`, {
    user: { email, password },
  }).then((res) => {
    expect(res.status).to.eq(200);
    const token = res.body.user.token;
    Cypress.env('token', token);
    cy.window().then((win) => win.localStorage.setItem('jwt', token));
    return token;
  });
});

Cypress.Commands.add('apiRegisterRandomUser', () => {
  const apiBase = Cypress.env('apiBaseUrl');
  const ts = Date.now();
  const user = {
    username: `user_${ts}`,
    email: `user_${ts}@example.com`,
    password: 'Password123!'
  };
  return cy.request('POST', `${apiBase}/users`, { user }).then((res) => {
    expect(res.status).to.eq(201);
    const token = res.body.user.token;
    Cypress.env('token', token);
    cy.window().then((win) => win.localStorage.setItem('jwt', token));
    return { ...user, token };
  });
});

Cypress.Commands.add('apiCreateArticle', (article) => {
  const apiBase = Cypress.env('apiBaseUrl');
  const token = Cypress.env('token');
  return cy.request({
    method: 'POST',
    url: `${apiBase}/articles`,
    headers: { Authorization: `Token ${token}` },
    body: { article },
  }).then((res) => {
    expect(res.status).to.eq(201);
    return res.body.article;
  });
});

Cypress.Commands.add('apiDeleteArticle', (slug) => {
  const apiBase = Cypress.env('apiBaseUrl');
  const token = Cypress.env('token');
  return cy.request({
    method: 'DELETE',
    url: `${apiBase}/articles/${slug}`,
    headers: { Authorization: `Token ${token}` },
    failOnStatusCode: false,
  });
});
