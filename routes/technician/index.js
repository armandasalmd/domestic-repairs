const Router = require('koa-router'); // const Router = require('koa-router');

const router = new Router();
const pathPrefix = '/tech';

router.get(`${pathPrefix}/`, async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if technician is logged in
		const username = ctx.session.user; // logged person username
		const data = {
			title: 'Technician dashboard',
			layout: 'nav-sidebar-footer',
			username: username
		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('technician/index', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

module.exports = router;
