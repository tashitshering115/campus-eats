
const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
  host: process.env.DB_HOST || 'ep-floral-snow-b473jig0-pooler.c-6.us-east-2.aws.neon.tech',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'neondb',
  user: process.env.DB_USER || 'neondb_owner',
  password: process.env.DB_PASS || 'npg_UTc3D6BfpJhd',
  ssl: process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: false }
    : false,
});

module.exports = db;
