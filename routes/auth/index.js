/* MODULE IMPORTS */
const Router = require('koa-router');

/* IMPORT CUSTOM MODULES */
const User = require('../../modules/user');
const Valid = require('../../modules/validators');

const router = new Router();
const { dbName } = require('../../constants');

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async (ctx) => {
	const data = {
		title: 'Please log in',
		layout: 'nav-footer',
		navbarType: 'offline'
	};
	if (ctx.query.msg) data.msg = ctx.query.msg;
	/*if (ctx.body.name) data.name = ctx.body.name;
	if (ctx.body.email) data.email = ctx.body.email;
	if (ctx.body.user) data.user = ctx.body.user;*/
	await ctx.render('auth/register', data);
});

/**
 * The script to process new user registrations.
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', async (ctx) => {
	try {
		// extract the data from the request
		const body = ctx.request.body;
		// data validation
		if (!Valid.name(body.name))
			throw new Error('Name must include first and last names');
		if (!Valid.email(body.email))
			throw new Error('Enter valid email address');
		if (!Valid.user(body.user)) throw new Error('Username is to short');
		if (!Valid.pass(body.pass)) throw new Error('Password is to short');

		// call the functions in the module
		const user = await new User(dbName);
		await user.register(body.user, body.name, body.email, body.pass);
		// await user.uploadPicture(path, type)
		// redirect to the logintest page
		ctx.redirect('/login/?msg=Successfully registered, please login');
	} catch (err) {
		return ctx.redirect(`/register/?msg=${err.message}`);
		//await ctx.render('error', { message: err.message });
	}
});

/**
 * Returns login page HTML
 * @route {GET} /login
 */
router.get('/login', async (ctx) => {
	const data = {
		title: 'Please log in',
		layout: 'nav-footer',
		navbarType: 'offline'
	};
	if (ctx.query.msg) data.msg = ctx.query.msg;
	//if (ctx.body.user) data.user = ctx.request.body.user;
	await ctx.render('auth/login', data);
});

/**
 * Handlers login form submit event
 * @route {POST} /login
 * @throws {Error} if failed to login and redirect to login page
 */
router.post('/login', async (ctx) => {
	try {
		const body = ctx.request.body;
		if (!body.user) throw new Error('Username cannot be empty');
		if (!body.pass) throw new Error('Password cannot be empty');
		const user = await new User(dbName);
		const response = await user.login(body.user, body.pass);

		ctx.session.authorised = true;

		ctx.session.username = response.username;
		ctx.session.fullName = response.fullName;
		ctx.session.email = response.email;
		ctx.session.type = response.type;

		return ctx.redirect(`/${response.type}`);
	} catch (err) {
		return ctx.redirect(`/login/?msg=${err.message}`);
		//await ctx.render('error', { message: err.message });
	}
});

/**
 * Performs logout, clears session data
 * @route {GET} /logout
 */
router.get('/logout', async (ctx) => {
	ctx.session.authorised = null;
	ctx.session.user = null;
	ctx.redirect('/');
});

module.exports = router;
