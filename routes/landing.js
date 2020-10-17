/* MODULE IMPORTS */
const Router = require('koa-router');
const sqlite = require('sqlite-async');
const { dbName } = require('../constants');

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

class reviews {
	/**
    *
    * @return {Array<Object>} An array of objects containing an order with attached quote if exists
    */

	async getReviews() {
		try {
			this.db = await sqlite.open(dbName);
			const sql = 'SELECT name, stars, review from reviews;';
			const data = await this.db.all(sql);
			if (data !== null) {
				return data;
			} else throw new Error('SQL returned empty object');
		} catch (err) {
			throw err;
		}
	}
}

router.get('/reviews', async (ctx) => {
	try {
		if (ctx.session.authorised === true) {
			ctx.session.authorised = null;
			ctx.session.user = null;
		}

		const mreviews = await new reviews(dbName);
		const reviewsCards = await mreviews.getReviews();
		const data = {
			title: 'Reviews',
			layout: 'nav-footer',
			navbarType: 'offline',
			reviewsCards,
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
		const db = await sqlite.open('./database.db');
		const sql = `INSERT INTO reviews(name,stars, review)
		VALUES("${body.name}", "${body.stars}", "${body.review}");`;
		await db.run(sql);
		await db.close();

		return ctx.redirect('/reviews?msg=Successfully added');
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}


	router.post('/reviews', async (ctx) => {
		try {
			// extract the data from the request
			const body = ctx.request.body;
			// TODO: data validation

			// call the functions in the module
			const mreviews = await new reviews(dbName);

			const f = {
				aname: body.name,
				astars: body.stars,
				areviews: body.reviews,

			};

			await mreviews.getReviews(
				ctx.session.username,
				f.aname,
				f.astars,
				f.areviews,
			);
		} catch (err) {
			return ctx.redirect(`/reviews?msg=${err.message}`);
			//await ctx.render('error', { message: err.message });
		}
	});


});


module.exports = router;
