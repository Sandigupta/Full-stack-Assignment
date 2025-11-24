const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
    development: {
        username: process.env.MYSQLUSER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.RAILWAY_TCP_PROXY_DOMAIN,
        port: process.env.RAILWAY_TCP_PROXY_PORT,
        dialect: 'mysql',
        logging: false
    },
    test: {
        username: process.env.MYSQLUSER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.DB_NAME_TEST || 'code_copilot_test',
        host: process.env.RAILWAY_TCP_PROXY_DOMAIN,
        dialect: 'mysql'
    },
    production: {
        username: process.env.MYSQLUSER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.RAILWAY_TCP_PROXY_DOMAIN,
        dialect: 'mysql'
    }
};
