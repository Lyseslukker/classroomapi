const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()


const pool = mysql.createPool({
    // host: 'containers-us-west-158.railway.app',
    // user: 'root',
    // database: 'railway',
    // password: 'LEPZHa7yk6OB1SYJn5A8',
    // port: 6378
    
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})



module.exports = pool.promise()
