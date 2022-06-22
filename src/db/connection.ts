import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  host: '127.0.0.1',
  user: process.env.DB_USER,
  port: 5432,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

export default pool;
