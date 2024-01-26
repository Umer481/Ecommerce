// pages/api/test-mysql.js

import connectDB from "../middleware/mongoose";

const handler = (req, res) => {
  // Use the MySQL connection from the request object
  const mysql = req.mysql;

  // Perform a simple query to test the connection
  mysql.query("SELECT 1 + 1 AS solution", (error, results, fields) => {
    if (error) {
      console.error("Error querying MySQL:", error);
      res.status(500).json({ error: "Database error", message: error.message });
      return;
    }

    // Log the result
    console.log("MySQL connected, result:", results[0].solution);
    res.status(200).json({ message: "MySQL connected" });
  });
};

export default connectDB(handler);
