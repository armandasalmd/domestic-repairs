/* MODULE IMPORTS */
const Router = require('koa-router');
const router = new Router();
const menus = require('../modules/menus');

/**
 * @path {GET} /user/contacts OR /tech/contacts
 * @returns {string} contacts page HTML
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
			sidebarSections:
				ctx.session.type === 'user' ? menus.user : menus.technician
		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('contacts', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

/**
 * @path {GET} /user/settings OR /tech/settings
 * @returns {string} settings page HTML
 */
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
			sidebarSections:
				ctx.session.type === 'user' ? menus.user : menus.technician
		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('accountSettings', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

module.exports = router;
