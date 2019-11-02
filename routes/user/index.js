import Router from 'koa-router'; // const Router = require('koa-router');

const router = new Router();

/*router.get('/', ctx () => {
    
});*/

router.get('/dashboard', async (ctx) => {
	// User main page
	ctx.body = 'User dashboard';
});

export default router;
