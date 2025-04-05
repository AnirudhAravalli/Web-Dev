const fs = require("fs");

// fs.appendFile("message.txt", "\nHello from Node JS!!!", (err) => {

//     if(err) throw err;

//     else 
//         console.log("Data written successfully");
// });

fs.readFile("./message.txt", "utf-8", (err, data) => {
    if(err) throw error;

    else 
        console.log(data);
});
// console.log(data);