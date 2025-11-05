// netlify/functions/get_coffee_blends/get_coffee_blends.mjs
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
export async function handler(event) {
  const sql = neon(process.env.DATABASE_URL);

  try {
    const rows = await sql.query('SELECT * FROM favorite_coffee_blends;');
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error1: error.message }),
    };
  }
}