import { subscribe } from "diagnostics_channel";
import mongoose, { mongo } from "mongoose";
import { type } from "os";

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedChannel: {
        type: String,
        required: true
    },
    subscribedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default mongoose.model("Subscriber", subscriberSchema)