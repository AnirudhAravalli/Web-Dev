import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./modules/User.js"
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "Session Secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  }))

app.use(passport.initialize())
app.use(passport.session())

// Connect to MongoDB
mongoose.connect("mongodb://localhost/secrets");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  console.log(req.user)
  if (req.isAuthenticated())
    res.render("secrets.ejs")
  else
    res.redirect("/login")
})

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.send("Email already exists. Try logging in.");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const newUser = new User({ email, password: hash });
          const savedUser = await newUser.save();
          req.login(savedUser, (error) => {
            console.log(error)
            res.redirect("/secrets")
          })
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", passport.authenticate("local", {           // Uses the local strategy(Only uses username and password) for authenticating the user 
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

passport.use(
  new Strategy(async function verify(username, password, cb) {
    console.log(username)
    try {
      const user = await User.findOne({ email: username })
      if (user) {
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            return cb(error)
          }
          else {
            if (result) {
              return cb(null, user)
            }
            else
              return cb(null, false)
          }
        })
      }
      else {
        return cb("User not found")
      }
    }
    catch (err) {
      console.log(err)
    }
  })
)

passport.serializeUser((user, cb) => {        // It is serializes the user information and stores it in the local storage 
  return cb(null, user)
})

passport.deserializeUser((user, cb) => {      // It deserializes the user information whenever we want to access the user information
  return cb(null, user)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});