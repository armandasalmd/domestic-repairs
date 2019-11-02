#!/usr/bin/env node

/* MODULE IMPORTS */
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const staticDir = require('koa-static');
const bodyParser = require('koa-bodyparser');
//const koaBody = require('koa-body')({ multipart: true, uploadDir: '.' });
const session = require('koa-session');

//const jimp = require('jimp')

/* IMPORT ROUTES */
const authRouter = require('./routes/auth/index');
const landingRouter = require('./routes/landing');

const app = new Koa();

/* CONFIGURING THE MIDDLEWARE */
app.keys = ['darkSecret'];
app.use(staticDir('public'));
app.use(bodyParser());
app.use(session(app));
app.use(
	views(
		`${__dirname}/views`,
		{ extension: 'handlebars' },
		{ map: { handlebars: 'handlebars' } }
	)
);

// Applying routes to the app
app.use(landingRouter.routes());
app.use(authRouter.routes());

const { defaultPort: port } = require('./constants');
module.exports = app.listen(port, async () =>
	console.log(`listening on port ${port}`)
);
