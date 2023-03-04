let games = document.querySelector(".history");
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

function game()
{
    let playerScore=0, computerScore=0;
    for(let i=0;i<5;i++)
    {
        let playerChoice, validChoice=false;
        while(!validChoice)
        {
            playerChoice=prompt("Please enter your choice(rock, paper or scissors)", "");
            playerChoice=playerChoice.toLowerCase();
            if(playerChoice==="rock"||playerChoice==="paper"||playerChoice==="scissors")
                validChoice=true;
            if(!validChoice)console.log("Invalid input");
        }
        let result=round(playerChoice, getComputerChoice());
        console.log(result);
        if(result==="Draw!")playerScore++, computerScore++;
        else if(result.charAt(4)==='w')playerScore++;
        else if(result.charAt(4)==='l')computerScore++;
        else throw new Error("Odd result/comparison");
    }
    if(playerScore>computerScore)console.log("You win!");
    else if(playerScore===computerScore)console.log("It's a draw, a sensation!");
    else console.log("You lose...");
}
game();
/*You can call game to play the game in the console, but I will use a GUI for the website*/