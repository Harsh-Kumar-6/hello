let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#rst-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
};

let count = 0;
boxes.forEach ((box) => {
    box.addEventListener("click", ()=>{
        if(turnO) {
            box.innerText = "O";
            turnO = false;
            count++;
        }
        else {
            box.innerText = "X";
            turnO = true;
            count++;
        }
        box.disabled = true;
        let isWinner = checkWinner();

        if(count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game is Draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();   
};

const disableBoxes = ()=> {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = ()=> {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                if(pos1Val === "O") {
                    console.log("Player1 is winner");
                    showWinner("player1");
                }
                else {
                    console.log("Player2 is winner");
                    showWinner("player2");
                }
                return true;
            }
            
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

