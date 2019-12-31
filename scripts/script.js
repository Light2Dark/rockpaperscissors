let playerFinalScore=0;
let compFinalScore=0;
let roundNum = 1;

const buttons = document.querySelectorAll("button");
buttons.forEach(button => addEventListener("click",playRound));

function computerPlay() {

    let randNum = getRandNum(1, 3);
    let computerAction = "";

    switch(randNum) {
        case 1: 
            return computerAction = "rock";
            break;
        case 2:
            return computerAction = "scissors";
            break;
        case 3:
            return computerAction = "paper";
            break;
        default:
            console.log("number generated is not btwn 1 & 3");
    }
}

function getPlayerInput() {
    let playerSelection = prompt("Welcome to Rock Paper Scissors. Enter one object (rock, paper or scissors):");

    if (playerSelection == null) {
        return console.log("Okie thankss");
    }

    playerSelection = playerSelection.toLowerCase();
    console.log(playerSelection);

    if ((playerSelection != "rock" && playerSelection != "paper" && playerSelection != "scissors") || playerSelection == "") {
        console.log("Please enter one of the objects.");
        getPlayerInput();
    }

    return playerSelection;
}

function playRound(e) {
    if (e.target.type != "button") {return;} // checks if click is at button.

    computerSelection = computerPlay();
    playerSelection = e.toElement.value;

    if ((playerSelection == "rock" && computerSelection == "rock") || (playerSelection =="scissors" && computerSelection =="scissors") || (playerSelection =="paper" && computerSelection =="paper")) {
        return whoWins(0.5, computerSelection); //IDK IF THIS WILL WORK, RETURN A FUNCTION??
    } 

    if((playerSelection =="rock" && computerSelection =="scissors") || (playerSelection =="scissors" && computerSelection == "paper") || (playerSelection=="paper" && computerSelection =="rock")) {
        return whoWins(1, computerSelection);
    } else {
        return whoWins(0, computerSelection); 
    }

    console.log("If this executes, it means something went wrong with the if statements");
}

function whoWins(score, computerSelection) {
    let roundSummary;

    if (score == 1) {
        roundSummary = "Win round " + roundNum + "! Against " + computerSelection;
        playerFinalScore++;

    } else if (score == 0.5) {
        roundSummary = "Round " + roundNum+ ": A draw, its okie. Computer chose: " + computerSelection;
        playerFinalScore += 0.5;
        compFinalScore += 0.5;

    } else if (score == 0) {
        roundSummary = "You have lost round " + roundNum + ". Try again. Opponent randomed " + computerSelection;
        compFinalScore += 0.5;

    } else {
        console.log("The score is not 0,0.5 or 1. Something went wrong");
    }

    roundNum++;
    const displayArea = document.querySelector(".displayArea");
    displayArea.innerHTML += roundSummary + ". <br>";

    if (playerFinalScore >= 5 || compFinalScore >= 5) {
        let playerWin = "Yay! You have won the game with " + playerFinalScore + " points.";
        let compWin = "You have lost the game, the computer scored " + compFinalScore + " points.";

        buttons.forEach(button => removeEventListener("click", playRound));

        const victory = (playerFinalScore >= 5) ? playerWin : compWin;
        return alert(victory);
    }
    
}

function getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}