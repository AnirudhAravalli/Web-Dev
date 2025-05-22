let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");

let turn0 = true;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Button has been clicked");
        if (turn0) {
            box.innerHTML = "O";
            turn0 = false;
        } else {
            box.innerHTML = "X";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

reset.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.disabled = false;
    });
});

const checkWinner = () => {
    for(let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos2 === pos3 && pos3 === pos1){
                document.querySelector("h1").innerHTML = `Player ${pos1} wins`;
                boxes.forEach((box) => {
                    box.disabled = true;
                })
            }
        }
    }
}