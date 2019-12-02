/* eslint-disable */
const { Given, When, Then } = require('cucumber');
const assert = require('assert');

// const todo = require('../modules/todo.js')
const Page = require('./page.js');

let page; // this is the page object we use to reference a web page

Given('The browser is open on the login page', async () => {
	page = await new Page(1600, 1200, 'http://localhost:3000/login');
});

When('I enter my username {string} and password {string}', async (username, password) => {
	await page.click('.input-text input[type="text"]'); //field represents the id attribute in html
	await page.keyboard.type(username);
	await page.click('.input-text input[type="password"]'); //field represents the id attribute in html
	await page.keyboard.type(password);
});

When('I click on the submit button', async () => {
	await page.click('.submit-button');
});

Then('take a screenshot called {string}', async filename => {
	await page.screenshot({ path: `acceptance_tests/screenshots/${filename}.png` });
});

Then('page title should be {string}', async title => {
	const text = await page.evaluate(() => {
		const dom = document.title;
		return dom;
	})
	if (title !== text)
		console.log("Title doesn't match");
	assert.equal(title, text);
});

Then('the pending orders list should contain {string} entries', async count => {
	count = parseInt(count);
	const articleElements = await page.evaluate(() => {
		const dom = document.querySelectorAll('#first-list article');
		return Array.from(dom)
	});
	if (articleElements.length !== count)
		console.log("Items count doesnt match");
	assert.equal(articleElements.length, count);
});

Then('I click on logout link', async () => {
	await page.goto('http://localhost:3000/logout');
});

Then('I get redirected to landing page', async () => {
	const url = await page.url();
	if (url !== 'http://localhost:3000/')
		console.log("Wrong redirect after logout");
	assert.equal(url, 'http://localhost:3000/');

});

Then('success', async () => {
	console.log('Cucumber test successfully finished');
});