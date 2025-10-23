// UI: Create and publish an article, then verify in profile
import { ArticleEditorPage, UserProfilePage, Header } from '../../pages/pages';

describe('Create and Publish Article', () => {
  const editor = new ArticleEditorPage();
  const profile = new UserProfilePage();
  const header = new Header();

  before(() => {
    // Register via API and set JWT
    cy.visit('/');
    cy.apiRegisterRandomUser();
  });

  it('testCreateAndPublishArticle', () => {
    const ts = Date.now();
    const title = `Nexus Title ${ts}`;
    const about = 'About Nexus';
    const body = 'This is the body of the article created by Cypress.';
    const tag = 'cypress';

    cy.uiGoToNewArticle();
    editor.title().type(title);
    editor.about().type(about);
    editor.body().type(body);
    editor.tags().type(`${tag}{enter}`);
    editor.publish().click();

    // Go to profile and assert article listed
    cy.contains('a.nav-link', 'Home').click();
    cy.contains('a.nav-link', 'Settings').click();
    cy.get('a.nav-link').contains('@').click({ force: true });
    profile.myArticlesTab().click();
    profile.articleList().contains(title).should('be.visible');
  });
});
