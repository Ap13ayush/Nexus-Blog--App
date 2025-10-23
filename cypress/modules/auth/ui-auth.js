// UI auth helpers (module: auth)
Cypress.Commands.add('uiLogout', () => {
  cy.get('a.nav-link').contains('Settings').click({ force: true });
  cy.contains('button', 'Or click here to logout.').click({ force: true });
});

Cypress.Commands.add('uiGoToNewArticle', () => {
  cy.get('a.nav-link').contains('New Article').click({ force: true });
});