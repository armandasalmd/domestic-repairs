const Router = require('koa-router'); // const Router = require('koa-router');
const menus = require('../../modules/menus');
const router = new Router();
const pathPrefix = '/tech';
const Database = require('sqlite-async')

const dbName = 'test.db'

router.get(`${pathPrefix}/`, async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if technician is logged in
		const username = ctx.session.user; // logged person username

		const sql = 'SELECT * FROM orders WHERE status="pending"'
		const db = await Database.open(dbName)
		const info = await db.all(sql)
		await db.close()
		console.log(info)


		const data = {
			title: 'Technician dashboard',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			sidebarSections: menus.technician,
			orders: info,
			username: username

		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('technician/index', data)
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

router.get(`${pathPrefix}/order/manage`, async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		// if technician is logged in
		const username = ctx.session.user; // logged person username

		const sql = 'SELECT * FROM orders, quotes WHERE status="in progress" and status_quote="accepted"'
		const db = await Database.open(dbName)
		const info = await db.all(sql)
		await db.close()
		console.log(info)


		const data = {
			title: 'Manage your orders',
			layout: 'nav-sidebar-footer',
			navbarType: 'online',
			sidebarSections: menus.technician,
			orders: info,
			username: username

		};

		if (ctx.query.msg) data.msg = ctx.query.msg;
		await ctx.render('technician/manage', data)
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});




module.exports = router;
