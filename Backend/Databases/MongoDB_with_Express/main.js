import mongoose from "mongoose";
import express from "express";
import Todo from "./Models/Abcd.js";

const app = express();
const port = 3000;

const conn = await mongoose.connect("mongodb://localhost:27017/myTodoApp");

app.get("/", async (req, res) => {
    // Create and save a new todo
    const first = new Todo({ title: "Second Todo", desc: "Description of the second todo", isDone: false });
    await first.save();

    // Fetch the todo and send it as JSON
    let todo = await Todo.findOne({ title: "Second Todo" });
    res.json(todo);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});