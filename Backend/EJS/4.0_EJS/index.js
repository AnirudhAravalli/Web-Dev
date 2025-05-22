import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

let date = new Date('November 3 2024');
let day = date.getDay();
let endOrDay = '';
let hardOrFun = '';

function print(req, res, next) {
    if(day == 0 || day == 6) {
        endOrDay += 'weekend';
        hardOrFun += 'have fun'
    }

    else {
        endOrDay += 'weekday';
        hardOrFun += 'work hard'
    }
    next();
}

app.use(print);

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs", {
        end: endOrDay,
        fun: hardOrFun
    });
});