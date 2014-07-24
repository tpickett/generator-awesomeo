'use strict';

module.exports = {
  env: 'development',
  db: {
  	<% if (awesomeo.express.extra['includeMongoose'] == true) { %>
    mongo: {
      host: process.env.DB_PORT_27017_TCP_ADDR || "localhost",
      port: process.env.DB_PORT_27017_TCP_PORT || 27017,
      username: null,
      password: null,
      db: "<%= _.slugify(_.humanize(awesomeo.name)) %>"
    },
    <% } %>
    <% if (awesomeo.express.extra['includeRedis'] == true) { %>
    redis: {
      host: process.env.REDIS_DB_PORT_6379_TCP_ADDR || "localhost",
      port: process.env.REDIS_DB_PORT_6379_TCP_PORT || 6379,
      password: null,
      namespace: "<%= _.slugify(_.humanize(awesomeo.name)) %>"
    }
    <% } %>
  }
};