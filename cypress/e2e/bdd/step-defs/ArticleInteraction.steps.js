import { HomePage, ArticlePage } from '../../../pages/pages';

const home = new HomePage();
const page = new ArticlePage();

before(() => {
  cy.visit('/');
  cy.apiRegisterRandomUser();
});

Given('I am a logged in user', () => {
  // already handled in before hook
});

When('I open an article from the global feed', () => {
  home.visit();
  home.globalFeedTab().click();
  home.firstArticle().click();
});

When('I add a comment {string}', (text) => {
  page.commentTextarea().type(text);
  page.postComment().click();
});

Then('I should see my comment {string} on the article', (text) => {
  page.comments().contains(text).should('be.visible');
});
