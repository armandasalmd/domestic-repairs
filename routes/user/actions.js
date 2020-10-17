/* IMPORT CUSTOM MODULES */
const Router = require('koa-router');
const Quotes = require('../../modules/quotes');
const Orders = require('../../modules/orders');
const { dbName } = require('../../constants');

const router = new Router({ prefix: '/user' });

/**
 * Deletes selected order
 * @path {GET} /order/remove/:id
 */
router.get('/order/remove/:id', async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		const mOrders = await new Orders(dbName);
		await mOrders.deleteOrderCascadingQuotes(ctx.params.id);
		//ctx.body = `remove ${ctx.params.id}`;
		ctx.redirect('back');
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

/**
 * Accepts quote order modifying the database and redirecting
 * @path {GET} /quote/accept/:id
 */
router.get('/quote/accept/:id', async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');

		const mQuotes = await new Quotes(dbName);
		await mQuotes.changeQuoteStatus(ctx.params.id, 'accepted');
		//ctx.body = `accept ${ctx.params.id}`;
		ctx.redirect('back');
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

/**
 * Rejects quote order modifying the database and redirecting
 * @path {GET} /quote/reject/:id
 */
router.get('/quote/reject/:id', async (ctx) => {
	try {
		if (ctx.session.authorised !== true)
			return ctx.redirect('/login?msg=you need to log in');
		const mQuotes = await new Quotes(dbName);
		await mQuotes.changeQuoteStatus(ctx.params.id, 'rejected');
		//ctx.body = `reject ${ctx.params.id}`;
		ctx.redirect('back');
	} catch (err) {
		await ctx.render('error', { message: err.message });
	}
});

module.exports = router;
