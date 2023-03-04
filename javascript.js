let rounds = document.querySelector(".history");
let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");
let roundRes = document.querySelector(".result");
let reset = document.querySelector(".reset-game-button");

function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3) + 1;
    switch (choice) {
        case 1:
            return "Rock";
        case 2:
            return "Paper";
        case 3:
            return "Scissors";
        default:
            throw new Error("Random not working right");
    }
}
function round(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    switch (playerSelection) {
        case "rock":
            switch (computerSelection) {
                case "rock": return "Draw!";
                case "paper": return "You lose! Paper beats rock";
                case "scissors": return "You win! Rock beats scissors";
            }
        case "paper":
            switch (computerSelection) {
                case "paper": return "Draw!";
                case "scissors": return "You lose! Scissors beats paper";
                case "rock": return "You win! Paper beats rock";
            }
        case "scissors":
            switch (computerSelection) {
                case "scissors": return "Draw!";
                case "rock": return "You lose! Rock beats scissors";
                case "paper": return "You win! Scissors beats paper";
            }
    }
}

function consoleGame() {
    let playerScore = 0, computerScore = 0;
    for (let i = 0; i < 5; i++) {
        let playerChoice, validChoice = false;
        while (!validChoice) {
            playerChoice = prompt("Please enter your choice(rock, paper or scissors)", "");
            playerChoice = playerChoice.toLowerCase();
            if (playerChoice === "rock" || playerChoice === "paper" || playerChoice === "scissors")
                validChoice = true;
            if (!validChoice) console.log("Invalid input");
        }
        let result = round(playerChoice, getComputerChoice());
        console.log(result);
        if (result === "Draw!") playerScore++, computerScore++;
        else if (result.charAt(4) === 'w') playerScore++;
        else if (result.charAt(4) === 'l') computerScore++;
        else throw new Error("Odd result/comparison");
    }
    if (playerScore > computerScore) console.log("You win!");
    else if (playerScore === computerScore) console.log("It's a draw, a sensation!");
    else console.log("You lose...");
}
/*You can call game to play the game in the console, but I will use a GUI for the website*/

function GUIgame() {
let playerScore = 0, computerScore = 0, gameFinished=false;
function addRoundToHistory(playerChoice, computerChoice, roundResult)
//create new list element in round history to display round details(choices and result) and shows last round result on top
{
    let li = document.createElement("li");
    roundResult = roundResult.toLowerCase();
    switch (roundResult) {
        case "win":
            li.style.backgroundColor = "green";
            roundRes.textContent="Win!";
            roundRes.style.color = "green";
            playerScore++;
            break;
        case "lose":
            li.style.backgroundColor = "red";
            roundRes.textContent="Loss.";
            roundRes.style.color = "red";
            computerScore++;
            break;
        case "draw":
            li.style.backgroundColor = "gold";
            roundRes.textContent="Draw";
            roundRes.style.color = "yellow";
            playerScore++;
            computerScore++;
            break;
        default:
            throw new Error("Odd roundResult/comparison");
    }
    rounds.appendChild(li);
    let div1 = document.createElement("div");
    div1.textContent = playerChoice;
    let div2 = document.createElement("div");
    div2.textContent = (roundResult === "draw" ? "=" : (roundResult === "win" ? ">" : "<"));
    let div3 = document.createElement("div");
    div3.textContent = computerChoice;
    li.appendChild(div1);
    li.appendChild(div2);
    li.appendChild(div3);

}
function createCountdown()//creates refresh countdown that can be paused if button clicked
{
    let stopCountdown=false;
    let pausePlay=document.getElementById("pause");
    let pausePlayImg=document.querySelector("#pause > img");
    pausePlay.addEventListener("click", ()=>
    {
        if(stopCountdown===false)
        {
            stopCountdown=true;
            pausePlayImg.src="./play.png";
        }
        else
        {
            stopCountdown=false;
            pausePlayImg.src="./pause.png";
        }
    });

    let countdownElement=document.querySelector(".countdown");
    document.getElementById("countdown-box").style.display="block";
    let secondsLeft=10;
    const startCountdown = () => {
        if(stopCountdown) return false;
        if(secondsLeft===0)document.location.reload();
        let countdownText=`Restarting the game in ${secondsLeft}...`;
        console.log(countdownText);
        countdownElement.textContent=countdownText;
        secondsLeft--;
        }
    startCountdown();
    timerInterval=setInterval(startCountdown, 1000);
    
}
function showResult(result)//shows the result, makes certain gif visible, hides rock paper scissors and creates page refresh countdown
{ 
    gameFinished=true;
    result=result.toLowerCase();
    let win=document.getElementById("win");
    let draw=document.getElementById("draw");
    let lose=document.getElementById("lose");
    switch(result)
    {
        case "win":
            win.style.display="block";
            break;
        case "draw":
            draw.style.display="block";
            break;
        case "lose":
            lose.style.display="block";
            break;
        default:
            throw new Error("Odd result/comparison");
    }
    document.querySelector(".rps").style.display="none";
    document.querySelector(".result").style.display="none";
    createCountdown();
}
function playRound(playerChoice) {
    let computerChoice = getComputerChoice();
    computerChoice = computerChoice.toLowerCase();
    let result = round(playerChoice, computerChoice);
    if (result === "Draw!")addRoundToHistory(playerChoice, computerChoice, "draw");
    else if (result.charAt(4) === 'w')addRoundToHistory(playerChoice, computerChoice, "win");
    else if (result.charAt(4) === 'l')addRoundToHistory(playerChoice, computerChoice, "lose");
    else throw new Error("Odd result/comparison");
    if(playerScore===5&&computerScore===5) showResult("draw");
    else if(playerScore===5) showResult("win");
    else if(computerScore===5) showResult("lose");
}
rock.addEventListener("click", () => { playRound("rock"); });
paper.addEventListener("click", () => { playRound("paper"); });
scissors.addEventListener("click", () => { playRound("scissors"); });
reset.addEventListener("click", ()=>{document.location.reload();});
document.addEventListener('keyup', function(event) {
    if (event.ctrlKey&&event.altKey) {
        if(event.key=="4")document.location.reload();
        else if(!gameFinished)
        switch(event.key)
        {
            case "1":
                playRound("rock");
                break;
            case "2":
                playRound("paper");
                break;
            case "3":
                playRound("scissors");
                break;
        }
    }
});
}
GUIgame();