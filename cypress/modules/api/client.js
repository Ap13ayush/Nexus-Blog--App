// API helper utilities (module: api)
export const api = {
  login(email, password) {
    const apiBase = Cypress.env('apiBaseUrl');
    return cy.request('POST', `${apiBase}/users/login`, { user: { email, password } });
  },
  register(user) {
    const apiBase = Cypress.env('apiBaseUrl');
    return cy.request('POST', `${apiBase}/users`, { user });
  },
  createArticle(article, token) {
    const apiBase = Cypress.env('apiBaseUrl');
    return cy.request({ method: 'POST', url: `${apiBase}/articles`, headers: { Authorization: `Token ${token}` }, body: { article } });
  },
  feed(token) {
    const apiBase = Cypress.env('apiBaseUrl');
    return cy.request({ method: 'GET', url: `${apiBase}/articles/feed`, headers: { Authorization: `Token ${token}` } });
  },
  deleteArticle(slug, token) {
    const apiBase = Cypress.env('apiBaseUrl');
    return cy.request({ method: 'DELETE', url: `${apiBase}/articles/${slug}`, headers: { Authorization: `Token ${token}` }, failOnStatusCode: false });
  }
};