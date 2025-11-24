import Sequelize from 'sequelize';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require('./config.cjs');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

export default sequelize;
