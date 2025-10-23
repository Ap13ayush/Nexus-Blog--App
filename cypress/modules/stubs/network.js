// Network stubs to remove external API dependency
// Usage: import { makeUser, stubSession, stubSignup, stubLogin, stubFeed, stubCreateArticle, stubProfileArticles, stubFavoritedArticles, stubArticleDetailsAndComments } from '../modules/stubs/network';

export function makeUser(suffix = Date.now()) {
  const username = `user_${suffix}`;
  const email = `${username}@example.com`;
  const token = `FAKE_TOKEN_${suffix}`;
  return { username, email, token, bio: null, image: null }; 
}

export function stubSession(user) {
  // App fetches current user
  cy.intercept('GET', '**/api/user', { statusCode: 200, body: { user } }).as('getUser');
  cy.window().then((win) => win.localStorage.setItem('jwt', user.token));
}

export function stubSignup(user) {
  cy.intercept('POST', '**/api/users', (req) => {
    req.reply({ statusCode: 201, body: { user } });
  }).as('postSignup');
}

export function stubLogin(user) {
  cy.intercept('POST', '**/api/users/login', (req) => {
    req.reply({ statusCode: 200, body: { user } });
  }).as('postLogin');
}

export function stubProfile(user) {
  cy.intercept('GET', `**/api/profiles/${user.username}`, {
    statusCode: 200,
    body: { profile: { username: user.username, bio: user.bio, image: user.image, following: false } },
  }).as('getProfile');
}

export function slugify(title){
  return title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') + '-' + Math.floor(Math.random()*1000);
}

export function stubCreateArticle(article, author){
  const slug = slugify(article.title);
  const articleResp = {
    slug,
    title: article.title,
    description: article.description || article.about || '',
    body: article.body || '',
    tagList: article.tagList || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    favorited: false,
    favoritesCount: 0,
    author: { username: author.username, bio: author.bio, image: author.image, following: false }
  };
  cy.intercept('POST', '**/api/articles', { statusCode: 201, body: { article: articleResp } }).as('postArticle');
  // Article page load
  cy.intercept('GET', `**/api/articles/${slug}`, { statusCode: 200, body: { article: articleResp } }).as('getArticle');
  // Author profile
  stubProfile(author);
  return slug;
}

export function stubProfileArticles(author, articles){
  cy.intercept('GET', `**/api/articles?author=${author.username}*`, {
    statusCode: 200,
    body: { articles, articlesCount: articles.length }
  }).as('getAuthorArticles');
}

export function stubFeed(articles){
  cy.intercept('GET', '**/api/articles*', {
    statusCode: 200,
    body: { articles, articlesCount: articles.length }
  }).as('getArticles');
}

export function stubFavorite(slug, articleUpdated){
  cy.intercept('POST', `**/api/articles/${slug}/favorite`, {
    statusCode: 200, body: { article: articleUpdated }
  }).as('favorite');
  cy.intercept('DELETE', `**/api/articles/${slug}/favorite`, {
    statusCode: 200, body: { article: articleUpdated }
  }).as('unfavorite');
}

export function stubFavoritedArticles(username, articles){
  cy.intercept('GET', `**/api/articles?favorited=${username}*`, {
    statusCode: 200,
    body: { articles, articlesCount: articles.length }
  }).as('getFavoritedArticles');
}

export function stubArticleDetailsAndComments(slug, article, initialComments){
  let comments = initialComments.slice();
  cy.intercept('GET', `**/api/articles/${slug}`, { statusCode: 200, body: { article } }).as('getArticle');
  cy.intercept('GET', `**/api/articles/${slug}/comments`, (req) => {
    req.reply({ statusCode: 200, body: { comments } });
  }).as('getComments');
  cy.intercept('POST', `**/api/articles/${slug}/comments`, (req) => {
    const text = req.body.comment.body;
    const newComment = { id: Math.floor(Math.random()*100000), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), body: text, author: { username: article.author.username, image: article.author.image, following:false, bio:null } };
    comments = [...comments, newComment];
    req.reply({ statusCode: 200, body: { comment: newComment } });
  }).as('postComment');
  cy.intercept('DELETE', `**/api/articles/${slug}/comments/*`, (req) => {
    const idStr = req.url.split('/').pop();
    const id = Number(idStr);
    comments = comments.filter(c => c.id !== id);
    req.reply({ statusCode: 200, body: {} });
  }).as('deleteComment');
}
