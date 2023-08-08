require('./config/__init__')
const { Nuxt, Builder } = require('nuxt')
let config_nuxt = require('./nuxt.config.js')

const buid = new Nuxt(config_nuxt)

new Builder(buid).build()
