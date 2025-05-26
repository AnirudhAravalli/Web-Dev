
import mongoose from "mongoose";
import { type } from "os";
import { title } from "process";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Todo"
    },
    desc: String,
    isDone: Boolean,
    days: Number
})

export default mongoose.model("Todo", todoSchema, "todoList")

