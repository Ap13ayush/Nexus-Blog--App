// UI: Favorite an article and verify in Favorited tab
import { HomePage, UserProfilePage } from '../../modules/ui/pages';

describe('Mark and Verify Favorite Article', () => {
  const home = new HomePage();
  const profile = new UserProfilePage();

  before(() => {
    cy.visit('/');
    cy.apiRegisterRandomUser();
  });

  it('testMarkAndVerifyFavoriteArticle', () => {
    home.visit();
    home.globalFeedTab().click();
    home.favoriteButtons().first().click();

    // Go to profile -> Favorited Articles
    cy.get('a.nav-link').contains('@').click({ force: true });
    profile.favoritedTab().click();
    profile.articleList().should('have.length.greaterThan', 0);
  });
});
