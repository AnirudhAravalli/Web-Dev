// function api() {
//     return new Promise((resolve, reject) => {

//         setTimeout(() => {
//             console.log("Weather Data")
//             resolve(200)
//         }, 2000)
//     })
// }

// async function getWeatherData() {
//     await api()
//     await api()
// }

function getData(DataID) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data " + DataID)
            resolve(200)
        }, 2000)
    })
}

// async function getAllData() {
//     await getData(1)
//     await getData(2)
//     await getData(3)
// }

// getAllData()

// IIFE

(async function getAllData() {
    await getData(1)
    await getData(2)
    await getData(3)
})