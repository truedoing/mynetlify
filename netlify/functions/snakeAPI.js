// netlify/functions/get_coffee_blends/get_coffee_blends.mjs
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
export async function handler(event) {
  const sql = neon(
    "postgresql://neondb_owner:npg_tA6cxp7QCyhV@ep-nameless-butterfly-ae1k0wkj-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
  );
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Successful preflight call." }),
      };
    }
    else if (event.httpMethod === "POST") {
        const rows = await sql.query("SELECT * FROM favorite_coffee_blends;");
        return {
        statusCode: 200,
        headers,
        body: JSON.stringify(rows),
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error1: error.message }),
    };
  }
}
