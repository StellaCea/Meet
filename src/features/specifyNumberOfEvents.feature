Feature: Specify number of events

Scenario: When the user has not specified the number of events, 32 is the default number
Given the user has not specified the number of events they want to see
When the user opens the app
Then the app displays a list of 32 upcoming events by default 

Scenario: User can change the number of events they want to see
Given the user sees a list of events
When the user specifies the number of events they want to see
Then the app should display that number of upcoming events

