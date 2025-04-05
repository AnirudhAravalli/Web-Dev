const url = "https://dattebayo-api.onrender.com/clans"
let t = document.querySelector("#name")
let btn = document.querySelector(".btn")

btn.addEventListener("click", getFacts)

async function getFacts() {

    console.log("Getting data......")
    let response = await fetch(url)
    console.log(response)
    let data = await response.json()

    clan = data["clans"]

    clan.forEach(c => {
        console.log(c.id)
        console.log(c.name)
        console.log(c.characters)
    })

    t.innerText = clan[0].name   

    // console.log(data.clans[0])
}