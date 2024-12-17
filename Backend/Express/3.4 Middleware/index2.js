import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.sendFile('/Users/anirudharavalli/Web Dev/Backend/Express/3.4 Middleware/public/index.html');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
