const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ncrs@1924",
  database: "emplo_db",
});

app.get("/users/:password/:userid", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from the pool: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
    const password = req.params.password;
    const userid = req.params.userid;

    const sql = "SELECT * FROM info_db WHERE password = ? AND user_name = ?";
    connection.query(sql, [password, userid], (error, results) => {
      connection.release();

      if (error) {
        console.error("error executing query:" + error.stack);
        return res.status(500).json({ error: "Database error" });
      }

      res.json(results);
    });
  });
});

app.listen(3002, () => {
  console.log("server started");
});
