import mongoose from "mongoose";
import User from './User.js';

mongoose.connect("mongodb://localhost:27017/sample")

run()

async function run() {
    try {
        // const user = await User.create({
        //     name: "Bro",
        //     age: 18, 
        //     email: "anirudh.aravalli05@gmail.com",
        //     hobbies: ["Watching YouTube", "Learning about Tech"],
        //     address: {
        //         street: "Main Street"
        //     }
        // })  
        // console.log("\n\n" + user + "\n\n")

        // users[0].bestFriend = "67c88f9b6b4ea9533b9ff26e"
        // await users[0].save()
        
        // const users = await User.findOne({ name: "Anirudh" })
        // console.log(users)

        // users.testFunction()
        
        // const users = await User.create({
        //     name: "Anirudh Aravalli",
        //     age: 20,
        //     email: "anirudh.aravalli05@gmail.com"
        // })

        // console.log(users.namedEmail)

        // const user = await User.findOne({ name: new RegExp("anirudh", 'i') })
        // user.deleteOne().then(
        //     console.log("Deleted the document successfully")
        // )

        const user = await User.find({ name: { $regex: "anirudh", $options: "i" }, email: { $regex: "anirudh.aravalli05@gmail.com", $options: "i" }}).limit(1)
        console.log(user)

        // user[0].age = 20
        await user[0].save()

        // await user.save()

        // const user1 = await User.find({ name: "Will Smith" })
        // console.log(user1)

    } catch (error) { 
        console.log(error)
    }

    
}

 