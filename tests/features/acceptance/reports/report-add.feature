@focus
Feature: Reports functionality

  Scenario Outline: Add a report
    Given I navigate to the login page
    And a <USER> user exists
    And the <USER> logs in
    And I navigate to the reportAdd page
    And I fill in the reportAdd form
    When I click the save button
    Then a report has been added

    Examples:
      | USER        |
      | developer   |
      | maintainer  |
      | contributor |