const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "react_login";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_map",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.delete("/api/delete/:shopId", async (req, res) => {
  //   const shopId = req.body.shopId;
  const shopId = req.params.shopId;
  const sqlDeleteBanner = "DELETE FROM banners WHERE shop_id = ?";
  const sqlDeleteShop = "DELETE FROM shops WHERE shop_id = ?";
  //   const sqlDelete =
  // "DELETE shops, banners FROM shops JOIN banners ON shops.shop_id = banners.shop_id WHERE shops.shop_id = ?";
  await db.query(
    sqlDeleteBanner,
    shopId,
    async (err, result) => {
      console.log(err);
      await db.query(sqlDeleteShop, shopId);
    },
    (err, result) => {
      res.json({ status: "ok", message: "delete success" });
      // res.status(200).send("Delete Success");
    }
  );
  res.json({ status: "ok", message: "delete success" });
  // res.status(200).send("Delete Success");
});
app.get("/api/get", async (req, res) => {
  const sqlSelect =
    "SELECT * FROM shops JOIN banners ON shops.shop_id = banners.shop_id";
  await db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/api/update/:shopId", async (req, res) => {
  const shopId = req.params.shopId;
  const { shopName, shopLatitude, shopLongtitude } = req.body;
  console.log(shopId, shopName, shopLatitude, shopLongtitude);
  const sqlUpdate =
    "UPDATE shops SET shop_name = ?, latitude = ?, longtitude = ? WHERE shop_id = ?";
  await db.query(
    sqlUpdate,
    [shopName, shopLatitude, shopLongtitude, shopId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("update success");
        res.status(200).json({ status: "ok", message: "updated successful" });
      }
    }
  );
});

app.post("/api/insert", async (req, res) => {
  const shopName = req.body.shopName;
  const shopLatitude = req.body.shopLatitude;
  const shopLongtitude = req.body.shopLongtitude;
  const imageUrl = req.body.imageUrl;
  const sqlInsertShop =
    "INSERT INTO shops (shop_name, latitude, longtitude) VALUES (?,?,?)";

  const sqlInsertBanner =
    "INSERT INTO banners (banner_img, shop_id) VALUES (?,?)";
  await db.query(
    sqlInsertShop,
    [shopName, shopLatitude, shopLongtitude],
    async (err, result) => {
      await db.query(sqlInsertBanner, [imageUrl, result.insertId]);
    }
  );
  res.status(200).send("Add Success");
});

app.post("/api/register", async (req, res) => {
  const userName = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  // const hashPassword = crypto.createHash("sha256", password).digest("hex");
  const hashPassword = await bcrypt.hash(password, 10);
  const sqlSelect = "SELECT * FROM users WHERE username = ?";
  const result = await db.query(sqlSelect, userName, async (err, result) => {
    if (result.length > 0) {
      // console.log(result);
      console.log("user exist");
      return res.status(400).send("User already existed.");
    } else {
      const sqlInsert =
        "INSERT INTO users (username, password, email) VALUES (?,?,?)";
      await db.query(
        sqlInsert,
        [userName, hashPassword, email],
        (err, result) => {
          console.log(err);
          res.status(200).send("register success");
        }
      );
    }
  });
});

app.post("/api/login", async (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;
  const sqlSelect = "SELECT * FROM users WHERE username = ?";
  const result = await db.query(sqlSelect, userName, async (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    if (result.length == 0) {
      res.json({ status: "error", message: "User not found" });
      // console.log(result);
      // res.status(401).send("No User Found.");
    } else {
      // console.log(result[0].password);
      bcrypt.compare(password, result[0].password, (err, isLogin) => {
        if (isLogin) {
          console.log("Login Success");
          var token = jwt.sign({ username: result[0].username }, secret, {
            expiresIn: "1h",
          });
          // console.log("this is token:", token, { expiresIn: "1h" });
          res.json({ status: "ok", message: "Login Success", token });
          // res.status(200).send("Login Success");
        } else {
          console.log("Login Failed");
          res.json({ status: "error", message: "Fail Login" });
          // res.status(401).send("Login Failed");
        }
      });
    }
  });
});

app.post("/api/auth", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("this is request", req);
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error" });
    console.log(err);
  }
});
app.listen(3838, () => {
  console.log("running on port 3838.");
});
