const baseURL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/{FROM}_{TO}.json"

const dropDown = document.querySelectorAll(".dropdown select")

const btn = document.querySelector(".get-rate")



const updateFlag = (element) => {
    let countryCode = countryList[element.value]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}

const updateCurrency = async (event) => {
    let amount = document.querySelector(".amount input")
    
    const fromValue = document.querySelector('select[name="from"]').value
    const toValue = document.querySelector('select[name="to"]').value

    let amtVal = amount.value

    if(amtVal === "" || amtVal < 0) {
        amtVal = 1
        amount.value = "1"
    }

    console.log(fromValue + " " + toValue)

    const url = `https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/${toValue}_${fromValue}.json`
    let response = await fetch(url)
    let data = await response.json()
    console.log(data.rate)

    const finalVal = amount.value * data.rate
    
    const msg = document.querySelector(".msg p")
    msg.innerText = `${amount.value} ${fromValue} = ${finalVal} ${toValue}`
    console.log(msg.innerText)
}

for (let select of dropDown){    
    for (currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode  // Data that is displayed to the user
        newOption.value = currCode      // Data that is actually sent to the server
        
        if(select.name === "from" && currCode === "USD")
            newOption.selected = "selected"
        else if(select.name === "to" && currCode === "INR")
            newOption.selected = "selected"
        select.append(newOption)
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target)
    })
}

btn.addEventListener("click", async (event) => {
    event.preventDefault()
    updateCurrency()
})

window.addEventListener("load", () => {
    updateCurrency()
})