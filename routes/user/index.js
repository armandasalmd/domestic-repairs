const Router = require('koa-router'); // const Router = require('koa-router');
const menus = require('../../modules/menus');

const router = new Router();
const pathPrefix = '/user';

router.get(`${pathPrefix}/`, async (ctx) => {
	try {
		console.log(ctx.session.authorised)
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

router.get(`${pathPrefix}/contacts`, async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if user is logged in
		const data = {
			title: 'Contacts',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			username: ctx.session.user,
			sidebarSections: menus.user
		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('contacts', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

router.get(`${pathPrefix}/order/new`, async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if user is logged in
		const data = {
			title: 'Contacts',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			username: ctx.session.user,
			sidebarSections: menus.user
		};

		await ctx.render('user/placeAnOrder', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

router.get(`${pathPrefix}/test`, async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if user is logged in
		const data = {
			title: 'test',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			sidebarSections: menus.user
		};

		await ctx.render('user/test', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});
module.exports = router;
