/* MODULE IMPORTS */
const Router = require('koa-router');
const koaBody = require('koa-body')({ multipart: true, uploadDir: '../../' });

/* IMPORT CUSTOM MODULES */
const User = require('../../modules/user');

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
		layout: 'nav-footer'
	};
	await ctx.render('auth/register', data);
});

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', koaBody, async (ctx) => {
	try {
		// extract the data from the request
		const body = ctx.request.body;
		console.log(body);
		// call the functions in the module
		const user = await new User(dbName);
		await user.register(body.user, body.pass);
		// await user.uploadPicture(path, type)
		// redirect to the home page
		ctx.redirect(`/?msg=new user "${body.name}" added`);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

router.get('/login', async (ctx) => {
	const data = {
		title: 'Please log in',
		layout: 'nav-footer'
	};
	if (ctx.query.msg) data.msg = ctx.query.msg;
	if (ctx.query.user) data.user = ctx.query.user;
	await ctx.render('auth/login', data);
});

router.post('/login', async (ctx) => {
	try {
		const body = ctx.request.body;
		const user = await new User(dbName);
		await user.login(body.user, body.pass);
		ctx.session.authorised = true;
		ctx.session.user = body.user;
		return ctx.redirect('/user/?msg=you are now logged in...');
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

router.get('/logout', async (ctx) => {
	ctx.session.authorised = null;
	ctx.session.user = null;
	ctx.redirect('/?msg=you are now logged out');
});

module.exports = router;
