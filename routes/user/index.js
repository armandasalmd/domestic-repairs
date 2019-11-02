const Router = require('koa-router'); // const Router = require('koa-router');

const router = new Router();
const pathPrefix = '/user';

router.get(`${pathPrefix}/`, async (ctx) => {
	// User main page
	ctx.body = 'User dashboard';
});

module.exports = router;
