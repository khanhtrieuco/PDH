const env = _getEnv();
let config = {
    environment: env.APP_ENV,
    port: env.PORT,
    ip: env.IP,
    hostname: env.NUXT_ENV_HOSTNAME,
    host_api: env.NUXT_ENV_API
};

function _getEnv() {
    const nodeEnv = process.env.NUXT_ENV_STAGE || 'local';
    const env = require('dotenv').config({
        path: `${__dirname}/.env.${nodeEnv}`
    }).parsed;

    Object.assign(env, process.env);

    const keys = Object.keys(env);

    keys.forEach(key => {
        switch (env[key]) {
            case 'true':
                env[key] = true;
                break;
            case 'false':
                env[key] = false;
                break;
            case 'null':
                env[key] = null;
                break;
            case 'undefined':
                env[key] = undefined;
                break;
            default:
                break;
        }
    });
    return env;
}

module.exports = config;