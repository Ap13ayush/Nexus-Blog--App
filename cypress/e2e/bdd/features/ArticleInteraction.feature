Feature: Article Interaction
  As a registered user, I want to add a comment to an article so that I can share my opinion.

  Background:
    Given I am a logged in user

  Scenario: Add a comment to an article
    When I open an article from the global feed
    And I add a comment "Great write-up!"
    Then I should see my comment "Great write-up!" on the article
