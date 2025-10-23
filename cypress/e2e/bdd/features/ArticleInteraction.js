import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { HomePage, ArticlePage } from '../../../modules/ui/pages';

const home = new HomePage();
const page = new ArticlePage();

import { makeUser, stubSession, stubFeed, stubArticleDetailsAndComments } from '../../../modules/stubs/network';

let seeded = false;

before(() => {
  const user = makeUser();
  cy.visit('/');
  stubSession(user);
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
  seeded = true;
});

Given('I am a logged in user', () => {
  expect(seeded).to.be.true;
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
