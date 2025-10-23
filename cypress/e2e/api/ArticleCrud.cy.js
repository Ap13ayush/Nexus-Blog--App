// API: Article CRUD with JWT

function uniqueArticle() {
  const ts = Date.now();
  return {
    title: `API Title ${ts}`,
    description: 'API article description',
    body: 'API article body',
    tagList: ['api', 'cypress']
  };
}

describe('API Article CRUD', () => {
  let token;
  let slug;

  before(() => {
    // Seed user and login to get token
    const email = `api_${Date.now()}@example.com`;
    const password = 'Password123!';
    cy.request('POST', `${Cypress.env('apiBaseUrl')}/users`, {
      user: { username: `api_${Date.now()}`, email, password }
    }).its('status').should('eq', 201);
    cy.request('POST', `${Cypress.env('apiBaseUrl')}/users/login`, {
      user: { email, password }
    }).then((res) => {
      token = res.body.user.token;
      Cypress.env('token', token);
    });
  });

  it('creates article (201)', () => {
    const article = uniqueArticle();
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/articles`,
      headers: { Authorization: `Token ${token}` },
      body: { article }
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.article.title).to.eq(article.title);
      slug = res.body.article.slug;
    });
  });

  it('gets user feed (200)', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/articles/feed`,
      headers: { Authorization: `Token ${token}` }
    }).its('status').should('eq', 200);
  });

  it('deletes article (204)', () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiBaseUrl')}/articles/${slug}`,
      headers: { Authorization: `Token ${token}` },
      failOnStatusCode: false
    }).its('status').should('eq', 204);
  });
});
