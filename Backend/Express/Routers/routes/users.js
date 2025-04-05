import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    res.send("User List")
})

router.get("/new", (req, res) => {
    res.send("User New Form")
})

router.post("/", (req, res) => {
    res.send("New User")
})

router.get("/:id", (req, res) => {
    
    res.send("User Get")
})

export default router