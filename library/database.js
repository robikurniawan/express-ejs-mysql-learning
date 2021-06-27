const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', 
    password: 'root', 
    database: 'db_express_mysql',
    port: 8889
});

pool.getConnection((err, connection) => {
    if (err)
        console.error("Something went wrong connecting to the database ...");

    if (connection)
        connection.release();
    return;
});

module.exports = pool;

