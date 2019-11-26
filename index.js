#!/usr/bin/env node

/* MODULE IMPORTS */
const Koa = require('koa');
// const logger = require('koa-logger');
const views = require('koa-views');
const staticDir = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
require('./views/helpers'); // register handlebars

//const koaBody = require('koa-body')({ multipart: true, uploadDir: '.' });
//const jimp = require('jimp')

/* IMPORT ROUTES */
const authRouter = require('./routes/auth/index');
const landingRouter = require('./routes/landing');
const common = require('./routes/common');
const userRouter = require('./routes/user/index');
const technicianRouter = require('./routes/technician/index');

const app = new Koa();

// Default error handler
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.statusCode || err.status;
		ctx.body = {
			message: err.message || 'Internal server error'
		};
	}
});

/* CONFIGURING THE MIDDLEWARE */
app.keys = ['darkSecret'];
app.use(staticDir('public'));
app.use(bodyParser());
/*app.use(async (ctx, next) => {
	console.log('*'); // adding extra line between request logs in console
	await next();
});
app.use(logger());*/
app.use(session(app));
app.use(
	views(`${__dirname}/views`, {
		extension: 'handlebars',
		map: { handlebars: 'handlebars' },
		options: {
			partials: {
				aside: `${__dirname}/views/partials/aside`,
				footer: `${__dirname}/views/partials/footer`,
				head: `${__dirname}/views/partials/head`,
				navbar: `${__dirname}/views/partials/navbar`,
				scripts: `${__dirname}/views/partials/scripts`
			}
		}
	})
);

// Applying routes to the app
app.use(authRouter.routes()); // public route set
app.use(landingRouter.routes()); // public route set
app.use(common.routes()); // authorized routes (any user)
app.use(userRouter.routes()); // authorized routes (must be user type of user)
app.use(technicianRouter.routes()); // authorized routes (must be user type of technician)

const { defaultPort: port } = require('./constants');

module.exports = app.listen(port, async () =>
	console.log(`listening on port ${port}`)
);
