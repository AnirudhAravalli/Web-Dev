import express from "express";
import axios from "axios";

const app = express();
const port = 3500;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "aranirudh911";
const yourPassword = "anirudh1";
const yourAPIKey = "dfdbb7d4-7df4-4b79-b300-5d2bd7bb0d8f";
const yourBearerToken = "f0431d27-95d3-4a61-99df-0763c4942b0f";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  try {
    const result = await axios.get(API_URL + "/random")
    const data = result.data
    res.render("index.ejs", { content: JSON.stringify(data) })
  }
  catch(error) {
    res.sendStatus(404).send(error.message)
  }
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  try {
    const result = await axios.get((API_URL + "/random"), {
      auth: {
        username: 'aranirudh911',
        password: 'anirudh1'
      },
      params: {
        page: 2
      }
    })
    const data = result.data
    res.render("index.ejs", { content: JSON.stringify(data) })
  }
  catch(error) {
    console.error(404).send(error.message)
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint

  try {

    const api = await axios.get(API_URL + "/generate-api-key")
    const data1 = api.data

    const result = await axios.get((API_URL + "/filter"), {
      params: {
        apiKey: (data1.apiKey),
        score: 7
      }
    })
    const data = result.data
    res.render("index.ejs", { content: JSON.stringify(data) })
  }

  catch(error) {
    console.log(error)
  }
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  const id = 42
  try {
    const response = await axios.get(API_URL + `/secrets/${id}`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      }
    })
    const data = response.data
    res.render("index.ejs", { content: JSON.stringify(data) })
  }

  catch(error) {
    console.log(error)
  }
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
