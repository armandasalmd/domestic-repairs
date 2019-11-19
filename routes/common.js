/* MODULE IMPORTS */
const Router = require('koa-router');
const router = new Router();
const menus = require('../modules/menus');

/**
 * Two paths accepted: /user/contacts or /tech/contacts
 */
router.get(/^\/((user)|(tech))\/(contacts)$/, async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=You need to log in');
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

router.get(/^\/((user)|(tech))\/(settings)$/, async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=You need to log in');
		// if user is logged in
		const data = {
			title: 'Account settings',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			username: ctx.session.user,
			sidebarSections: menus.user
		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('accountSettings', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

module.exports = router;
