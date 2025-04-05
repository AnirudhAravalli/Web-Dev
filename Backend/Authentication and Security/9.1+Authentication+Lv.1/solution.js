import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 4000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Create User Model
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
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.send("Email already exists. Try logging in.");
    } else {
      const newUser = new User({
        email: email,
        password: password
      });

      await newUser.save();
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
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
    res.status(500).send("Error during login");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
