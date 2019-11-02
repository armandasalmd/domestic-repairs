const Router = require('koa-router'); // const Router = require('koa-router');

const router = new Router();
const pathPrefix = '/tech';

router.get(`${pathPrefix}/`, async (ctx) => {
	// User main page
	ctx.body = 'Technician dashboard';
});

module.exports = router;
