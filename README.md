**Meet App** assists users in discovering, organizing and participating in events that take place in different cities.

The app is a serverless, progressive web apllication (PWA) build with React using test-driven development technique. The application uses the Google Calendar API to fetch upcoming events. 

**FEATURE 1: FILTER EVENTS BY CITY**

*User story: **As a** user **I should be able to** see different events in different cities **So that** I can have a better overview of events in a specific city.*

**Scenario 1: When a user hasn’t searched for a city, show upcoming events from all cities.**
**Given** user hasn’t searched for any city **When** the user opens the app **Then** the user should see a list of all upcoming events.

**Scenario 2: User should see a list of suggestions when they search for a city.**
**Given** the main page is open **When** user starts typing in the city textbox **Then** the user should see a list of cities (suggestions) that match  what they’ve typed.

**Scenario 3: User can select a city from the suggested list.**
**Given** the user was typing “Berlin” in the city textbook and the list of suggested cities is showing **When** the user selects a city (feks “Berlin, Germany”) from the list **Then** their city should be changed to that city and the user should receive a list of upcoming events in that city.

**FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS**

*User story: **As a** user **I should be able to** show and hide event details **So that** I can get more information about a specific event I might be interested to attend.*

**Scenario 1: An event element is collapsed by default.**
**Given** the user was typing a city name in the city box **When** the user choses a city **Then** the list of upcoming events is displayed without any details.

**Scenario 2: User can expand an event to see its details.**
**Given** the list of events in a specific city is displayed **When** the user clicks on the “show details” button **Then** the user can see more details about the event.

**Scenario 3: User can collapse an event to hide its details.**
**Given** an event was opened and the user sees the details of the event **When** the user clicks on “hide details” button **Then** the event collapses and details are hidden.

**FEATURE 3: SPECIFY NUMBER OF EVENTS**

*User story: **As a** user **I should be able to** see a number of upcoming events **So that** I can plan better and make decisions about how to participate in events.*

**Scenario 1: When the user hasn’t specified a number, 32 is the default number.**
**Given** the user was typing the name of a city in the textbox **When** the user clicks on the city from the list of cities **Then** the number of upcoming events in that city is set to 32 by default.

**Scenario 2: User can change the number of events they want to see.**
**Given** the city is chosen and the number of events is not set **When** then user enters the number of events they want to see **Then** the chosen amount of events is displayed.

**FEATURE 4: USE THE APP WHEN OFFLINE**

*User story: **As a** user **I should be able to** use the app offline **So that** I can have access to the information when there is no internet connection.*

**Scenario 1: Show cached data when there’s no internet connection.**
**Given** there is no internet connection **When** the user opens the app **Then** the cached data from last session is displayed.

**Scenario 2: Show error when user changes the settings (city, time range).**
**Given** there is no internet connection **When** the user attempts to change the settings **Then** an error message that the data is not available without internet connection is displayed.

**FEATURE 5: DATA VISUALIZATION**

*User story: **As a** user **I should be able to** see a chart with the number of upcoming events **So that** I can better and faster perceive the information about events in different cities.*

**Scenario 1: Show a chart with the number of upcoming events in each city.**
**Given** the user has received a list of upcoming events **When** the user clicks on the “Visualise” button **Then** a chart with the number of upcoming events in the chosen city is displayed.

**How I'll use serverless functions:**
I have already set up a project in the Google Console and enabled Google Calendar API. This will allow my serverless function to interact with the Calendar API. Then I will write code to create, retrieve, update events, or perform other operations on the calendar. The next step is authentication. I’ll use OAuth 2.0 to obtain an access token that will grunt my friction with the necessary permissions to interact with the Calendar API on behalf of the user. I’ll use HTTP requests (create, read, update, delete) to make API calls from the serverless function to the google calendar API endpoints. To finalize, I will deploy and test the serverless function. 


