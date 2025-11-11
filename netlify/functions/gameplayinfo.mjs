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
    } else if (event.httpMethod === "GET") {
        let {studentkey} = event.queryStringParameters;
        if(studentkey!="" && studentkey!=null){
        const rows = await sql.query(`SELECT * FROM player_data WHERE  student_no = '${studentkey}' order BY playtime DESC;`);
        return {
        statusCode: 200,
        headers,
        body: JSON.stringify(rows),
        };
        }else{
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: "Bad Request: Missing student key" }),
            };
        }
    }
    else if (event.httpMethod === "POST") {
        let {student_no, score,  likenum, player_name, des} = JSON.parse(event.body);
        await sql.query(`INSERT INTO player_data (student_no, score, playtime, likenum, player_name, des) 
          VALUES ('${student_no}', ${score}, now(), ${likenum}, '${player_name}', '${des}')`);
         return {
        statusCode: 200,
        headers,
        body: JSON.stringify(student_no),
        };
    }else{
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error1: error.message }),
    };
  }
}
