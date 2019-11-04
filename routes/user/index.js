const Router = require('koa-router'); // const Router = require('koa-router');

const router = new Router();
const pathPrefix = '/user';

router.get(`${pathPrefix}/`, async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if user is logged in
		const username = ctx.session.user; // logged person username
		const data = {
			title: 'User dashboard',
			layout: 'nav-sidebar-footer',
			username: username
		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('user/index', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

router.get(`${pathPrefix}/order`, async (ctx) => {
	// User main page
	ctx.body = 'User dashboard2';
});

module.exports = router;
