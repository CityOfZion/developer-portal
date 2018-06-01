Feature: Homepage

  Scenario: Login form exists
    Given I navigate to the home page
    Then the login form is visible

  Scenario: Register page exists
    Given I navigate to the home page
    And There is a register button
    When  I click the register button
    Then I am redirected to register page