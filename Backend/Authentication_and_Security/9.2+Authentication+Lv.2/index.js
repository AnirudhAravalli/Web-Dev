import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import User from "./models/User.js"

const app = express();
const port = 3000;
const saltRounds = 10

mongoose.connect("mongodb://localhost:27017/users");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

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
  const email = req.body.username;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.send("Email already exists. Try logging in.");
    } else {
      const newUser = new User({
        email: email,
        password: await bcrypt.hash(password, saltRounds)
      });
      await newUser.save();
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  const userEmail = req.body.username;
  const userPassword = req.body.password;

  try {
    const user = await User.findOne({ email: userEmail })
    if(user){  
      const match = await bcrypt.compare(user.password, userPassword)
      if(match) {
        res.render("secrets.ejs")
      }
      else {
        res.send("Incorrect credentials")
      }
    }
    else {
      res.send("User not found")
    }
  } 
  catch (error) {
    res.status(500).json({ message: error.message });

  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
