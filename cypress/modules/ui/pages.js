// Simple Page Objects for Conduit (module: ui)
export class Header {
  profileByUsername(username) { return cy.get('a.nav-link').contains(username); }
  signIn() { return cy.get('a.nav-link').contains('Sign in'); }
  signUp() { return cy.get('a.nav-link').contains('Sign up'); }
  newArticle() { return cy.get('a.nav-link').contains('New Article'); }
  settings() { return cy.get('a.nav-link').contains('Settings'); }
}

export class HomePage {
  visit() { cy.visit('/'); }
  globalFeedTab() { return cy.contains('a.nav-link', 'Global Feed'); }
  articleCards() { return cy.get('div.article-preview'); }
  firstArticle() { return this.articleCards().first().find('a.preview-link'); }
  favoriteButtons() { return cy.get('button.btn.btn-sm.btn-outline-primary'); }
}

export class LoginPage {
  visit() { cy.visit('/#/login'); }
  email() { return cy.get('input[type="email"]'); }
  password() { return cy.get('input[type="password"]'); }
  submit() { return cy.get('button[type="submit"]'); }
}

export class RegistrationPage {
  visit() { cy.visit('/#/register'); }
  username() { return cy.get('input[placeholder="Username"]'); }
  email() { return cy.get('input[placeholder="Email"]'); }
  password() { return cy.get('input[placeholder="Password"]'); }
  submit() { return cy.get('button[type="submit"]'); }
}

export class ArticleEditorPage {
  visit() { cy.visit('/#/editor'); }
  title() { return cy.get('input[placeholder="Article Title"]'); }
  about() { return cy.get('input[placeholder="What\'s this article about?"]'); }
  body() { return cy.get('textarea[placeholder="Write your article (in markdown)"]'); }
  tags() { return cy.get('input[placeholder="Enter tags"]'); }
  publish() { return cy.contains('button', 'Publish Article'); }
}

export class ArticlePage {
  commentTextarea() { return cy.get('textarea[placeholder="Write a comment..."]'); }
  postComment() { return cy.contains('button', 'Post Comment'); }
  comments() { return cy.get('.card .card-text'); }
  deleteCommentButtons() { return cy.get('.mod-options .ion-trash-a'); }
}

export class UserProfilePage {
  usernameHeader() { return cy.get('h4'); }
  myArticlesTab() { return cy.contains('a.nav-link', 'My Articles'); }
  favoritedTab() { return cy.contains('a.nav-link', 'Favorited Articles'); }
  articleList() { return cy.get('.article-preview'); }
}