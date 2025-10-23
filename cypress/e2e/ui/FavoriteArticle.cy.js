// UI: Favorite an article and verify in Favorited tab
import { HomePage, UserProfilePage } from '../../modules/ui/pages';
import { makeUser, stubSession, stubFeed, stubFavorite, stubFavoritedArticles, stubProfileArticles, stubProfile } from '../../modules/stubs/network';

describe('Mark and Verify Favorite Article (stubbed API)', () => {
  const home = new HomePage();
  const profile = new UserProfilePage();

  it('testMarkAndVerifyFavoriteArticle', () => {
    const user = makeUser();
    stubSession(user);
    cy.visit('/');
    cy.wait('@getUser');

    // Seed global feed with one article
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
      author: { username: 'someone', bio: null, image: null, following: false }
    };
    stubFeed([article]);

    home.visit();
    home.globalFeedTab().click();

    // When favoriting, return updated article
    const updated = { ...article, favorited: true, favoritesCount: 1 };
    stubFavorite(slug, updated);
    home.favoriteButtons().first().click();

    // Favorited tab should list it
    stubFavoritedArticles(user.username, [updated]);
    // Also stub My Articles (empty) to render tabs without network
    stubProfileArticles(user, []);
    stubProfile(user);
    cy.get('a.nav-link').contains(user.username).click({ force: true });
    profile.favoritedTab().click();
    profile.articleList().contains('Hello World').should('be.visible');
  });
});
