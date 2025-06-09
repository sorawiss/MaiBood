// import mysql from 'mysql2/promise'


// // Create the connection pool
// const pool = mysql.createPool({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'mai-bood',
//     waitForConnections: true,
//     queueLimit: 0
// });


// // Test the connection
// async function testConnection() {
//     try {
//         await pool.getConnection();
//         console.log('Connected to the database');
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//     }
// }

// testConnection();


// export default pool;