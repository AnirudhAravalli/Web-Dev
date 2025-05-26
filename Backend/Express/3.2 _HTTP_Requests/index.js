import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Homepage</h1>");
    // console.log(req.rawHeaders);
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Me</h1>");
    res.send("<h3>Hi, I am Anirudh</h3>");
});

app.get("/about", (req, res) => {
    res.send("<h1>I am Anirudh. I am eagerly learning the MERN Stack.</h1>");
})

app.post("/register", (req, res) => {
    res.sendStatus(200);
});

app.put("/user", (req, res) => {
    res.sendStatus(200);
});

app.delete("/user", (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log("Server has started running at port " + port);
});