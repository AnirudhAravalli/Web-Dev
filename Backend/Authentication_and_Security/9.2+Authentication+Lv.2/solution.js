import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 4000;

// TODO: Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/userDB");

// TODO: Create User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// TODO: Create User Model
const User = mongoose.model("User", userSchema);

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
    // TODO: Check if user exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.send("Email already exists. Try logging in.");
    } else {
      // TODO: Create new user
      const newUser = new User({
        email: email,
        password: password
      });

      // TODO: Save user to database
      await newUser.save();
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    // TODO: Find user by email
    const user = await User.findOne({ email: email });

    if (user) {
      // TODO: Check password
      if (password === user.password) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
