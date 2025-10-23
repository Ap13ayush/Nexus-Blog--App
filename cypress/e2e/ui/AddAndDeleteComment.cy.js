// UI: Add and delete a comment on an article
import { HomePage, ArticlePage } from '../../pages/pages';

describe('Add and Delete Comment', () => {
  const home = new HomePage();
  const article = new ArticlePage();

  before(() => {
    cy.visit('/');
    cy.apiRegisterRandomUser();
  });

  it('testAddAndDeleteComment', () => {
    home.visit();
    home.globalFeedTab().click();
    home.firstArticle().click();

    const text = `Great write-up! ${Date.now()}`;
    article.commentTextarea().type(text);
    article.postComment().click();
    article.comments().contains(text).should('be.visible');

    // Delete the comment
    article.deleteCommentButtons().first().click({ force: true });
    article.comments().contains(text).should('not.exist');
  });
});
