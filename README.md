Test cases Rules:

## Libraries used:
1) Jest
2) Jest-cucumber
3) Enzyme
4) React testing library / React Native testing library (RTL/RNTL) 
  => Most existing blocks use Enzyme but you are encouraged to use RTL/RNTL instead. 
  => Support for Enzyme in more recent versions of React / React Native is not provided so using RTL/RNTL is better for the long term.


## The main things to bear in mind when writing unit tests:
1) Tests will be treated with equal importance to the code they are testing.
2) Tests will be written for all new code.
3) Tests will be written for all changed code.
4) Tests will be written for all bug fixes.
5) Minimum target coverage is 80% across all categories(branches, functions, statements, lines).
6) Test errors and ‘sad paths’ as well as the ‘happy path’.
7) Remember that the coverage metric is only a starting point, just because your tests meet the test coverage threshold does not mean that they are good tests!.


## Summary of each principle:
1) Don’t test implementation details – your final expectations should be on the actual output, not internal state of your component.
2) Check the right things – always strive to check on specific text or data, with using test-id as a backup. Avoid generic `truthy` or `falsey` checks.
3) Mock external APIs/Libraries, then check they are called – Never call an actual API endpoint as part of a unit test. Do mock them and check they are called with expected params.
4) Given, When, Then (GWT) – Consider setting your tests out with GWT feature files and use each step appropriately.


## Don’t Test Implementation Details:
1) This means you should focus your testing efforts on inputs and outputs of your component, rather than what it is doing internally.
Try to change your thinking or approach to test your code like a user would experience it in the app. Rather than thinking “if a button is pressed, what values will be held internally by the component” you should think “if a button is pressed, what should the user see on the screen and how do I check that?”

 
## Mock External APIs/Libraries:
1) Avoid calling real APIs in your tests.
2) Unit tests should give you a reliable and fast feedback loop, particularly when updating/refactoring code. If a unit test that was passing is now failing after an update it’s a clear sign that the behavior of the component has been changed and either this was expected from the update or a bug has been introduced.
4) If clicking on a button in your component would call an external API, for example, then that should be a clear test case that has an expectation that the mock of that API is called with the expected params.
5) If the result will then be displayed to the user then this should also be tested, but as a separate expectation. See in the examples section on how best to structure this.

 
## Given, When, Then

Given – the setup,
When – the trigger,
Then – the outcome.


In the Given step:
1) Here is where you can perform any specific setup needed for the test, such as passing in the right props, or setting a particular response for a mock, or directly setting the internal state if absolutely necessary (this is less bad practice than using internal state for your final test expectation, but still should be avoided when possible)

In the When step:
1) when you have a test that has several steps, e.g. the user enters text in the input and then clicks the submit button – this is where the And step can be used rather than having multiple When steps.

In the Then step: 
1) Do not perform any clean up or similar here, that can be done using the jest `afterEach` function. Keeping this step to a single ‘expect’ makes it nice and clear what the test is doing and how it is checking it.
