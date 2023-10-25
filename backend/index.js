const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_map",
});

db.getConnection((err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection success");
  }
});
app.get("/", (req, res) => {
  res.send("hello word22");
});

app.listen(3838, () => {
  console.log("running on port 3838.");
});
