import express from "express";
import bodyParser from "body-parser";
import User from "./models/User.js"
import mongoose from "mongoose";
import { error } from "console";

await mongoose.connect("mongodb://localhost:27017/users")
  .then(() => { console.log("Connected to the database successfully") })

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  let userEmail = req.body.username
  let userPassword = req.body.password

  const existingUser = await User.findOne({ email: userEmail })

  if (!existingUser) {
    User.create({
      email: userEmail,
      password: userPassword
    })

    res.render("secrets.ejs")
  }
  else {
    res.render("register.ejs", {
      error: "User already exists",
      alertClass: "alert alert-danger"
    });
  }
});

app.post("/login", async (req, res) => {
  const userEmail = req.body.username
  const userPassword = req.body.password

  const existingUser = await User.findOne({ email: userEmail })
  // console.log(existingUser.password)
  if(existingUser) {
    if(existingUser.password === userPassword) {
      res.render("secrets.ejs")
    }
    else {
      res.render("login.ejs", {
        error: "Incorrect Credentials",
        alertClass: "alert alert-danger"
      })
    }
  }
  else {
    res.render("login.ejs", {
      error: "User not found",
      alertClass: "alert alert-danger"
    })
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});