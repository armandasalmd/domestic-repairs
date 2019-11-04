/* MODULE IMPORTS */
const Router = require('koa-router');
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
			layout: 'nav-footer'
		};

		await ctx.render('index', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

module.exports = router;
