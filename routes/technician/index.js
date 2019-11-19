const Router = require('koa-router');
const menus = require('../../modules/menus');
const Database = require('sqlite-async');

const router = new Router({ prefix: '/tech' });
const dbName = require('../../constants').dbName;

/**
 * Matches everything that starts with /user
 * Acts as a middleware to protect the route
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

router.get('/', async ctx => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if technician is logged in
		const username = ctx.session.username; // logged person username
		const sql = 'SELECT * FROM orders WHERE order_status="pending";';
		const db = await Database.open(dbName);
		const info = await db.all(sql);
		await db.close();
		console.log(info);

		const data = {
			title: 'Technician dashboard',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			sidebarSections: menus.technician,
			orders: info,
			username: username
		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('technician/index', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

router.get('/manage', async ctx => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if technician is logged in
		const username = ctx.session.user; // logged person username

		let tableInProgress;
		try {
			//
			//const sql = 'SELECT * FROM orders, quotes WHERE order_status="in progress" and status_quote="accepted"';
			const sql = `SELECT * FROM orders INNER JOIN quotes 
				ON quotes.order_id = orders.order_id WHERE orders.technician_id = '${ctx.session.username}'`;
			const db = await Database.open(dbName);
			const info = await db.all(sql);
			await db.close();
			console.log(info);
		} catch (err) {
			tableInProgress = {};
		}

		const data = {
			title: 'Manage your orders',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			sidebarSections: menus.technician,
			orders: tableInProgress,
			username: username
		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('technician/manage', data);
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

module.exports = router;
