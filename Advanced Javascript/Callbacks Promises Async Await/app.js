// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("I am a promise")
//         console.log(promise)
//         resolve( )
//         console.log(promise)
//     }, 2000)
// })

// const getPromise = () => {
//     return new Promise((resolve, reject) => {
//         console.log("I am a promise")
//         resolve("success")
//     })
// }

// let promise = getPromise()
// promise.then((res) => {
//     console.log("Promise fulfilled")
// })


// promise.catch((err) => {
//     console.log("Promise rejected")
// })

// function asyncFunction1() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("some data 1")
//             resolve("Success")
//         }, 4000)
//     })
// }

// function asyncFunction2() { 
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("some data 2")
//             resolve("Success")
//         }, 4000)
//     })
// }

// console.log("Fetching data 1")
// asyncFunction1().then(() => {
//     console.log("Fetched data 1 successfully")

//     console.log("Fetching data 2")
//     asyncFunction2().then(() => {
//         console.log("Fetched data 2 successfully")
//     })
// })



function getData(dataId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data ", dataId)
            resolve("Success")
        }, 1000 )
    })
}

// Promise Chaining

// getData(1).then((res) => {
//     console.log(res)

//     getData(2).then((res) => {
//         console.log(res)

//         getData(3).then((res) => {
//             console.log(r es)

//             getData(4).then((res) => {
//                 console.log(res)
//             })
//         })
//     })
// })

getData(1)
    .then((res) => {
        console.log(res)
        return getData(2)
    })
    .then((res) => {
        console.log(res)
        return getData(3)
    })
    .then((res) => {
        console.log(res)
        return getData(4)
    })


// getData(1, () => {
//     getData(2, () => {
//         getData(3, () => {
//             getData(4)
//         })
//     })
// })
