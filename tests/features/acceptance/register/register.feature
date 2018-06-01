Feature: User Registration

  Scenario: User registers
    Given I navigate to the register page
    And I fill in the register form
    When I click the create-account button
    And I see a success modal
    Then a user has been added