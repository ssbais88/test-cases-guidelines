Feature: CountryCodeBlocking

    Scenario: User navigates to CountryCodeBlocking
        Given I am a User loading CountryCodeBlocking
        When I navigate to the CountryCodeBlocking
        Then CountryCodeBlocking will load with out errors

        When Clicked on checkcountry code button
        Then CountryCodeBlocking is blocked or not
        And Modal message show

        When ClearDigit on press button
        Then PhoneNumber state became empty
        
        When Onpress modal close button
        Then Modal has been closed