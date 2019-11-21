const Router = require('koa-router');
const menus = require('../../modules/menus');
const Database = require('sqlite-async');

const router = new Router({ prefix: '/tech' });
const dbName = require('../../constants').dbName;
const Orders = require('../../modules/orders');
const Quotes = require('../../modules/quotes');

/**
 * Matches everything that starts with /tech
 * Acts as a middleware to protect the route
 * @route /tech/*
 */
router.use(async (ctx, next) => {
	if (ctx.session.authorised === true && ctx.session.type === 'tech') {
		await next(); // user is authorized, search for next route
	} else {
		return ctx.redirect('/login?msg=Please login');
		/*ctx.status = 401;
		ctx.body = 'Unauthorized access blocked';*/
	}
});

/**
 * @path {GET} /tech
 * @returns {string} technician dashboard page
 */
router.get('/', async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if technician is logged in
		const username = ctx.session.username; // logged person username
		/*const sql = 'SELECT * FROM orders WHERE order_status="pending";';
		const db = await Database.open(dbName);
		const info = await db.all(sql);
		await db.close();
		console.log(info);*/

		const mOrders = await new Orders(dbName);
		const quote = await mOrders.getQuotesByUsername(username);
		const results = await mOrders.getOrdersByStatus('pending');
		const data = {
			title: 'Technician dashboard',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			sidebarSections: menus.technician,
			orders: results,
			quote: quote,
			username: username
		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('technician/index', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

/**
 * @path {GET} /tech/manage
 * @returns {string} technician manage orders page
 */
router.get('/manage', async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if technician is logged in
		const username = ctx.session.user; // logged person username
		const mOrders = await new Orders(dbName);

		// list of jobs in progress
		const progress = await mOrders.getOrdersByStatus('in progress');


		// list of jobs in completed
		const completed = await mOrders.getOrdersByStatus('completed');




		const data = {
			title: 'Manage your orders',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			sidebarSections: menus.technician,
			ordersInProgress: progress,
			ordersInCompleted: completed,

			username: username

		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('technician/manage', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

/**
 * Interacts with a Quote model to insert data into database
 * @path {POST} /tech/quote
 * @throws {Error} if form data was incorect
 */
router.post('/quote', async (ctx) => {
	try {
		const f = ctx.request.body;
		/*const f = {
			quote: ctx.body.quote,
			price: ctx.body.price,
			order_id: ctx.body.order_id
		};*/
		const mQuotes = await new Quotes(dbName);
		mQuotes.provideQuote(f.order_id, f.quote, f.price);
		ctx.redirect('/tech?msg=Successfuly provided a quote');
		// Cannot%20read%20property%20%27order_id%27%20of%20undefined
	} catch (err) {
		ctx.redirect(`/tech?msg=${err.message}`);
	}
});

module.exports = router;
