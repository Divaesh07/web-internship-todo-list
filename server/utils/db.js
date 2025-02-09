const { createPool } = require('mysql2/promise');

const pool = createPool({
 host: 'kishore07.xyz',
  user: 'nandaa',
  password: '1234',
  database: 'todolist',
  namedPlaceholders: true,
  waitForConnections: true,
  connectionLimit: 10,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

module.exports = { pool };
