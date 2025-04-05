import mongoose, { mongo } from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: String,
    salary: Number,
    language: String,
    city: String,
    isManager: Boolean
})

export default mongoose.model("Data", employeeSchema, "employees")