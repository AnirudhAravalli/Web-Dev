import express from "express";
import userRouter from "./routes/user" 

const port = 3000
const app = express()

app.use("/users", userRouter)

app.listen(port, () => {
    console.log(`Listening started on port ${port}`)
}) 