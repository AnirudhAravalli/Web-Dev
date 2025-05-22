 import express from "express";

const a = express();
const port = 3000;

a.listen(port, () => {
    console.log(`The server has started at port ${port}`);
})