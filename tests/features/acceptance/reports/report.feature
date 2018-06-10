Feature: Reports functionality

  Scenario Outline: Add and edit a report
    Given I navigate to the login page
    And a <USER> user exists
    And the <USER> logs in
    And I navigate to the reportAdd page
    And I fill in the reportAdd form
    When I click the save button
    And a report has been added
    And I navigate to the reports page
    When I click the report-edit button
    And I fill in the reportEdit form
    And I click the save button
    Then a report has been edited

    Examples:
      | USER        |
      | maintainer  |
      | contributor |
      | developer   |
