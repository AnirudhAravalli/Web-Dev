import express from "express"
import mongoose, { mongo } from "mongoose"
import "dotenv/config"
import subscribersRouter from "./routes/subscribers.js"

await mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to the database'))

const port = 3000
const app = express()

app.use(express.json())             // Allows our server accept json as a body that means that our server accepts only json as the input and not any other type of input
app.use("/subscribers", subscribersRouter)



app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})