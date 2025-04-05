// HINTS:
// 1. Import express and axios
import express from "express"
import axios from "axios"

// 2. Create an express app and set the port number.
let app = express()
let port = 3000
let API_URL = "https://secrets-api.appbrewery.com"

// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
app.get("/", async (req, res) => {
    try {
        let response = await axios(API_URL + "/random")
        res.render("index.ejs", {
            secret: response.data.secret,
            user: response.data.username
        })
    }

    catch(error) {
        res.sendStatus(404)
    }
})
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})