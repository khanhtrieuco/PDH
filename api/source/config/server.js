module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1338),
  cron: { enabled: false },
  admin: { autoOpen: false },
  url: 'https://phandanghoang.com/',
  // url: 'https://nasdemo-website.click/',
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
