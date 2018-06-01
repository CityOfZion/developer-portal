Feature: Login page

  Scenario Outline: User logs in
    Given I navigate to the login page
    And a <USER> user exists
    When the <USER> logs in
    Then I am redirected to dashboard page

    Examples:
      | USER        |
      | developer   |
      | admin       |
      | council     |
      | maintainer  |
      | contributor |