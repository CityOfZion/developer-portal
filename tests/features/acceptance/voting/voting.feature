@watch
Feature: Voting functionality

  Scenario Outline: Council can vote
    Given I navigate to the login page
    And a council user exists
    And the council logs in
    And there are 2 reports
    And I navigate to the councilReports page
    When I click the vote button
    And I click the vote-5 button
    Then a report has been edited

    Examples:
      | USER        |
      | maintainer  |
      | contributor |
      | developer   |
