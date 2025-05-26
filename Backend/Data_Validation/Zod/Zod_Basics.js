import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import {z} from "zod";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

var hobby = ["Programming", "Watching Movies", "Music"] 

const userInput = z.object({
    street: z.string().min(1, "Street cannot be empty"),
    pet: z.string().min(1, "Pet cannot be empty"),
    hobby: z.enum(["Programming", "Watching Movies", "Music"])
}).partial();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
    
    // console.log(req.body)

    const formData = {
       street: req.body.street,
       pet: req.body.pet,
       hobby: req.body.hobby
    }

    const result = userInput.safeParse(formData);

    // console.log(result)

    if(result.success) {
        res.render(__dirname + "/views/index.ejs", {bandName: `${req.body["hobby"]} ${req.body["street"]} ${req.body["pet"]}`})
        // console.log("Valid Data: ", result.data);
    }

    else {
        res.status(400).send("Raatleda!!");
    }

    console.log(userInput.partial().parse(user))
})

app.listen(port, () => {
    console.log(`Started Listening at port ${port}`);
});
