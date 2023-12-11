const express = require("express");
const cors = require("cors");
const User = require("./models/User.js");
require("dotenv").config();
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const database = require("./config/database.js");
const cookieParser = require("cookie-parser");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecert = "fasefraw4r5r3wq45wdfgw34twdfg";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  })
);
app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json({success:true, message:"Registration successfull"});
  } catch (error) {
    res.json({success:false, message:"Registration failed"});
    // res.status(422).json(error);
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
            name: userDoc.name,
          },
          jwtSecert,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("pass not ok");
      }
    } else {
      res.json("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (cookies) {
    jwt.verify(token, jwtSecert, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json({ token });
  }
});

app.listen(4000);
