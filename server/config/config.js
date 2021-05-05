module.exports = {
  development: {
    dialect: 'postgres',
    username: process.env.DEV_DB_USER || 'postgres',
    password: process.env.DEV_DB_PASSWORD || 'postgres',
    database: process.env.DEV_DB_NAME || 'news_db',
    host: process.env.DEV_DB_HOST || 'localhost',
    port: Number(process.env.DEV_DB_PORT) || 5432,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    dialect: 'postgres',
    adapter: process.env.PROD_DB_ADAPTER,
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    port: Number(process.env.PROD_DB_PORT),
    dialectOptions: {
      bigNumberStrings: true,
    },
    encoding: 'unicode',
    pool: 5,
  },
};
