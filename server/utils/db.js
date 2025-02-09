const { createPool } = require('mysql2/promise');

const pool = createPool({
 host: 'ur_hostname',
  user: 'ur_username',
  password: 'ur_password',
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
