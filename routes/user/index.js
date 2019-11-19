const Router = require('koa-router');
const menus = require('../../modules/menus');
const dropdowns = require('../../modules/dropdowns');

const router = new Router({ prefix: '/user' });

/**
 * Matches everything that starts with /user
 * Acts as a middleware to protect the route
 */
router.use(async (ctx, next) => {
	if (ctx.session.authorised === true && ctx.session.type === 'user') {
		await next(); // user is authorized, search for next route
	} else {
		ctx.status = 401;
		ctx.body = 'Unauthorized access blocked';
	}
});

router.get('/', async ctx => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if user is logged in
		const data = {
			title: 'User dashboard',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			username: ctx.session.user,
			sidebarSections: menus.user
		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('user/index', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

router.get('/order/new', async ctx => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if user is logged in
		const data = {
			title: 'New order',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			username: ctx.session.user,
			sidebarSections: menus.user,
			aType: dropdowns.applianceType,
			aManufacturer: dropdowns.applianceManufacturer,
			aAge: dropdowns.applianceAge
		};

		await ctx.render('user/placeAnOrder', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

module.exports = router;
