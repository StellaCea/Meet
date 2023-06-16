Feature: Show/hide event details

    Scenario: An event element is collapsed by default
        Given the user sees a list of events
        When the user sees an event element
        Then the list of upcoming events is displayed without any details

    Scenario:  User can expand an event to see its details
    Given the list of events in a specific city is displayed without event details
    When the user clicks the 'show details' button
    Then the event element should expand, displaying the event details

    Scenario: User can collapse an event to hide its details
    Given an event element is expanded
    When the user clicks the "hide details" button
    Then the event element collapses hiding the details

