@watch
Feature: Reports functionality

  Scenario Outline: Edit a report
    Given I navigate to the login page
    And the <USER> logs in
    And I navigate to the reports page
    When I click the report-edit button
    And I fill in the reportEdit form
    And I click the save button
    Then a report has been edited

    Examples:
      | USER        |
      | developer   |
      | maintainer  |
      | contributor |