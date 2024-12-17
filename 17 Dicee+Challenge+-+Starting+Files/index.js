function imageGenerator(num, imgClass) {
    document.querySelector(imgClass).setAttribute("src", `./images/dice${num}.png`)
}

var randomNumber1 = Math.floor(6 * (Math.random())) + 1;
imageGenerator(randomNumber1, ".img1");

var randomNumber2 = Math.floor(6 * (Math.random())) + 1;

imageGenerator(randomNumber2, ".img2");

if (randomNumber1 > randomNumber2) 
    document.querySelector("h1").innerHTML = "Player 1 Wins";

else if (randomNumber1 < randomNumber2) 
    document.querySelector("h1").innerHTML = "Player 2 Wins";

else if (randomNumber1 == randomNumber2)
    document.querySelector("h1").innerHTML = "No Player Won";