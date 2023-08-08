let configEnv = require('./config/__init__');
const { Nuxt, Builder } = require('nuxt')
var express = require('express');
var app = express();
const nuxt = new Nuxt(require('./nuxt.config.js'));
const port = configEnv.port;
const env = configEnv.environment;

async function start() {
	

	if (env === 'local') {
	    new Builder(nuxt).build()
	}
	else {
	    await nuxt.ready();
	}
	app.use(nuxt.render)

	app.listen(port, '0.0.0.0')
}
start()
module.exports = app;