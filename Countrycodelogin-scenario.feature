Feature: CountryCodeLogin

    Scenario: User navigates to CountryCodeLogin
        Given I am a User loading CountryCodeLogin
        When I navigate to the CountryCodeLogin
        Then CountryCodeLogin will load with out errors
        And styles load

        When Enter email in input
        Then Input email set at state

        When Enter password in input
        Then Input password set at state

        When After enter admin email and password and click on login button
        Then User login api call with admin role

        When After enter user email and password and click on login button
        Then User login api call with user role

        When Enter wrong user email and password then click on login button
        Then User login api check for error