// UI: Create and publish an article, then verify in profile
import { ArticleEditorPage, UserProfilePage, Header } from '../../modules/ui/pages';
import { makeUser, stubSession, stubCreateArticle, stubProfileArticles } from '../../modules/stubs/network';

describe('Create and Publish Article (stubbed API)', () => {
  const editor = new ArticleEditorPage();
  const profile = new UserProfilePage();
  const header = new Header();

  it('testCreateAndPublishArticle', () => {
    const user = makeUser();
    stubSession(user);
    cy.visit('/');
    cy.wait('@getUser');

    const ts = Date.now();
    const title = `Nexus Title ${ts}`;
    const about = 'About Nexus';
    const body = 'This is the body of the article created by Cypress.';
    const tag = 'cypress';

    // Stub create article and subsequent loads
    const slug = stubCreateArticle({ title, about, body, tagList: [tag] }, user);

    // Navigate directly to editor to avoid flaky header rendering in SPA
    cy.visit('/#/editor');
    editor.title().type(title);
    editor.about().type(about);
    editor.body().type(body);
    editor.tags().type(`${tag}{enter}`);
    editor.publish().click();

    // Profile articles show newly created
    const articleResp = {
      slug,
      title,
      description: about,
      body,
      tagList: [tag],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: false,
      favoritesCount: 0,
      author: { username: user.username, bio: user.bio, image: user.image, following: false }
    };
    stubProfileArticles(user, [articleResp]);

    const headerUsername = user.username;
    // Go to profile
    cy.get('a.nav-link').contains(headerUsername).click({ force: true });
    profile.myArticlesTab().click();
    profile.articleList().contains(title).should('be.visible');
  });
});
