/* MODULE IMPORTS */
const Router = require('koa-router');
const sqlite = require('sqlite-async');


const router = new Router();

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 * @authentication This route requires cookie-based authentication.
 */
router.get('/', async (ctx) => {
	try {
		if (ctx.session.authorised === true) {
			// console.log(`User ${ctx.session.user} has been logged off!`);
			ctx.session.authorised = null;
			ctx.session.user = null;
		}
		const data = {
			title: 'Domestic Repairs',
			layout: 'nav-footer',
			navbarType: 'offline'
		};

		await ctx.render('index', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

/**
 * @path {GET} /contacts
 * @returns {string} returns default contacts page
 */
router.get('/contacts', async (ctx) => {
	try {
		if (ctx.session.authorised === true) {
			// console.log(`User ${ctx.session.user} has been logged off!`);
			ctx.session.authorised = null;
			ctx.session.user = null;
		}
		const data = {
			title: 'Contacts',
			layout: 'nav-footer',
			navbarType: 'offline'
		};

		await ctx.render('contacts', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

router.get('/reviews', async (ctx) => {
	try {
		if (ctx.session.authorised === true) {
			ctx.session.authorised = null;
			ctx.session.user = null;
		}
		const data = {
			title: 'Reviews',
			layout: 'nav-footer',
			navbarType: 'offline'
		};

		await ctx.render('reviews', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

router.get('/newreview', async (ctx) => {
	try {
		if (ctx.session.authorised === true) {
			ctx.session.authorised = null;
			ctx.session.user = null;
		}
		const data = {
			title: 'New Review',
			layout: 'nav-footer',
			navbarType: 'offline'
		};

		await ctx.render('newreview', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

router.post('/newreview', async (ctx) => {
	try {
		console.log(ctx.request.body);
		const body = ctx.request.body;
		const db = await sqlite.open('./database.db')
		const sql = `INSERT INTO reviews(name,stars, review)
		VALUES("${body.name}", "${body.stars}", "${body.review}");`
		await db.run(sql);
		await db.close();

		return ctx.redirect('/reviews?msg=Successfully added');
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}

});


module.exports = router;
