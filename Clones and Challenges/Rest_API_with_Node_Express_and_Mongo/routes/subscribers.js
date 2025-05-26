import express from "express"
import Subscriber from "../models/subscriber.js"

const router = express.Router()

async function getSubscriber(req, res, next) {
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null) {
            return res.status(404).json({ message: "Cannot find the subscriber." })
        }
    }
    catch(error) {
        res.status(500).json({ message: error.message })
    }
    res.subscriber = subscriber
    next()
}

// Getting all
router.get("/", async (req, res) => {
    try{
        const subscribers = await Subscriber.find()
        res.send(subscribers)
    }
    catch(error){
        res.status(500).json({message : error.message})   // 500 means that there was some issue with our server
    }
})
// Creating one
router.post("/new", async (req, res) => {
    try{
        const newSubscriber = await Subscriber.create({
            name: req.body.name,
            subscribedChannel: req.body.subscribedChannel,
            subscribedDate: req.body.subscribedDate
        })
        res.status(201).json(newSubscriber)
    }
    catch(error) {
        res.status(500).json({ message: error.message })
    }
})

// Getting one
router.get("/:id", getSubscriber, (req, res) => {
    res.send(res.subscriber)
})
// Updating one  
router.patch("/:id", getSubscriber, async (req, res) => {
    if(req.body.name != null) 
        res.subscriber.name = req.body.name

    if(req.body.subscribedChannel != null)
        res.subscriber.subscribedChannel = req.body.subscribedChannel

    if(req.body.subscribedDate != null)
        res.subscriber.subscribedDate = req.body.subscribedDate

    try{
        const updatedSubscriber = res.subscriber.save()
        res.json(updatedSubscriber)
    }
    catch(error) {
        res.status(500).json({ message: error.message })
    }
})
 
// Deleting one
router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await Subscriber.findByIdAndDelete(req.params.id)
        res.json({ message: "Subscriber deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


export default router