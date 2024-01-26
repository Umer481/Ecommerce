import mysql from "mysql2";

// MySQL connection details
const mysqlConfig = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "library",
};

// Create a MySQL pool
const pool = mysql.createPool(mysqlConfig);

// Middleware to handle database connections
const connectDB = (handler) => async (req, res) => {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      // Handle connection errors
      console.error("Error getting MySQL connection:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }

    req.mysql = connection;

    // Call the handler with the modified request and response objects
    handler(req, res);

    // Release the connection back to the pool when done
    connection.release();
  });
};

export default connectDB;
