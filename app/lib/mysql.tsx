import mysql, { ResultSetHeader } from 'mysql2/promise';


export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    waitForConnections: true
})

export async function query(queryStr:string, values = []) {

    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA,
    });
  
    try {
      const [results] = await dbconnection.execute(queryStr, values);
      dbconnection.end();
      return results;
    } catch (error) {
        console.log(error);
      //throw Error(error.message);
      return { error };
    }
  }

  export async function insertQuery(queryStr:string, values = []) {

    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA,
    });
  
    try {
      const [results] = await dbconnection.execute<ResultSetHeader>(queryStr, values);
      dbconnection.end();
      return results.insertId;
    } catch (error) {
        console.log(error);
      //throw Error(error.message);
      return { error };
    }
  }