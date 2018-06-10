@watch
Feature: Voting functionality

  Scenario: Council can vote
    Given I navigate to the login page
    And a council user exists
    And the council logs in
    And there are 2 reports made 7 days ago
    And I navigate to the councilReports page
    When I click the vote button
    And I click the vote-5 button
    Then a vote has been cast
    And I click the vote-2 button
    When a vote has been cast
    Then a voting closing date should be set

