Feature: CountryCodeAdmin

    Scenario: User navigates to CountryCodeAdmin
        Given I am a User loading CountryCodeAdmin
        When I navigate to the CountryCodeAdmin
        Then CountryCodeAdmin will load with out errors
        And styles load

        When Fetch country list from api
        Then We get all list of country

        When I am clicked on toggle button to block country
        Then Blocked country api call
        And Country toggle button checked

        When Search country name
        Then Searchterm state change