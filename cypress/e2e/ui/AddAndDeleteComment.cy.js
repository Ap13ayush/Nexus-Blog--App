// UI: Add and delete a comment on an article
import { HomePage, ArticlePage } from '../../modules/ui/pages';
import { makeUser, stubSession, stubFeed, stubArticleDetailsAndComments } from '../../modules/stubs/network';

describe('Add and Delete Comment (stubbed API)', () => {
  const home = new HomePage();
  const page = new ArticlePage();

  it('testAddAndDeleteComment', () => {
    const user = makeUser();
    stubSession(user);
    cy.visit('/');
    cy.wait('@getUser');

    // Seed feed with one article and stub its details/comments
    const slug = 'hello-world-123';
    const article = {
      slug,
      title: 'Hello World',
      description: 'desc',
      body: 'body',
      tagList: ['test'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: false,
      favoritesCount: 0,
      author: { username: user.username, bio: null, image: null, following: false }
    };
    stubFeed([article]);
    stubArticleDetailsAndComments(slug, article, []);

    home.visit();
    home.globalFeedTab().click();
    home.firstArticle().click();

    const text = `Great write-up! ${Date.now()}`;
    page.commentTextarea().type(text);
    page.postComment().click();
    cy.wait('@postComment');
    page.comments().contains(text).should('be.visible');

    // Delete the comment that matches text (click trash icon)
    cy.contains('.card', text).find('i.ion-trash-a').click({ force: true });
    cy.wait('@deleteComment');
    // Force re-fetch of comments to reflect deletion in DOM
    cy.reload();
    cy.wait('@getComments');
    cy.contains('.card .card-text', text).should('not.exist');
  });
});
