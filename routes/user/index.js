/* IMPORT CUSTOM MODULES */
const Router = require('koa-router');
const Orders = require('../../modules/orders');
const menus = require('../../modules/menus');
const dropdowns = require('../../modules/dropdowns');
const { dbName } = require('../../constants');

const router = new Router({ prefix: '/user' });

/**
 * Matches everything that starts with /user
 * Acts as a middleware to protect the route
 * @route /user/*
 */
router.use(async (ctx, next) => {
	if (ctx.session.authorised === true && ctx.session.type === 'user') {
		await next(); // user is authorized, search for next route
	} else {
		ctx.status = 401;
		ctx.body = 'Unauthorized access blocked';
	}
});

/**
 * @path {GET} /tech
 * @returns {string} user dashboard page
 */
router.get('/', async (ctx) => {
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

/**
 * @path {GET} /user/order/new
 * @returns {string} create new order form page
 */
router.get('/order/new', async (ctx) => {
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

/**
 * Interacts with a Order model to insert data into database
 * @path {POST} /user/order/new
 * @throws {Error} if form data was incorect
 */
router.post('/order/new', async (ctx) => {
	try {
		// extract the data from the request
		const body = ctx.request.body;
		// TODO: data validation

		// call the functions in the module
		const mOrders = await new Orders(dbName);
		const f = {
			aType:
				body.applianceTypeCustom === ''
					? body.applianceType
					: body.applianceTypeCustom,
			aManufacturer:
				body.applianceManufacturerCustom === ''
					? body.applianceManufacturer
					: body.applianceManufacturerCustom,
			aAge: body.applianceAge,
			issue: body.issue
		};
		await mOrders.addNewOrder(
			ctx.session.username,
			f.aType,
			f.aManufacturer,
			f.aAge,
			f.issue
		);
		// await user.uploadPicture(path, type)
		// redirect to the logintest page
		ctx.redirect('/user/order/new?msg=Successfully added');
	} catch (err) {
		return ctx.redirect(`/user/order/new?msg=${err.message}`);
		//await ctx.render('error', { message: err.message });
	}
});

module.exports = router;
