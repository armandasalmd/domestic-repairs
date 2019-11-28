Feature: Adding Items
	The user should be able to login with test:test123.

	Scenario: login redirects to user dashboard
		Given The browser is open on the login page
		When I enter my username "test" and password "test123"
		Then take a screenshot called "loginform"
		When I click on the submit button
		Then page title should be "User dashboard"
		Then take a screenshot called "dashboard"
		Then the pending orders list should contain "3" entries
		Then I click on logout link
		Then I get redirected to landing page
		Then take a screenshot called "testfinish"
		Then success