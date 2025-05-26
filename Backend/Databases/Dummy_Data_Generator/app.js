// Generate dummy data in this format in a collection called employees in a db called company

// {
//     name: "Harry",
//     salary: 450000,
//     language: "Python",
//     city: "Hyderabad",
//     isManager: true
// }

// Generate 10 such records when a button called generateData is clicked

// Create an express app to achieve it with mongoose
// Every time the button is clicked you should clear the collection

import mongoose from "mongoose";
import express from "express";
import path from "path";
import Data from "./models/employeeData.js";
import { fileURLToPath } from "url";

const port = 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsPath = path.join(__dirname + "/views")

app.set('view engine', 'ejs');
app.set("views", viewsPath);

const names = ["Harry", "Raghav", "Naruto", "Sung Jinwoo", "Kamado Tanjiro", "Itadori Yuuji"];
const languages = ["Python", "JavaScript", "Rust", "Go", "Java"];
const cities = ["Hyderabad", "New York", "London", "Delhi", "Bengaluru", "Chennai"];

const manager = () => Math.random() < 0.5;
const man = () => Math.floor(Math.random() * 10) + 1;
const randomIndex = (arr) => Math.floor(Math.random() * arr.length);

await mongoose.connect("mongodb://localhost:27017/company");

app.get("/", async (req, res) => {
    let employees = await Data.find()
    res.render("index.ejs", { data: employees });
});

app.get("/get-data", async (req, res) => {
    await Data.deleteMany({});
    let employees = [];

    for (let i = 0; i < 10; i++) {
        const employee = await Data.create({
            name: names[randomIndex(names)],
            salary: man() * 10000,
            language: languages[randomIndex(languages)],
            city: cities[randomIndex(cities)],
            isManager: manager()
        });
        employees.push(employee);
    }
    res.json(employees); 
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
