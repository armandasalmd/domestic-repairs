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
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		const data = {};
		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('index');
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

module.exports = router;
