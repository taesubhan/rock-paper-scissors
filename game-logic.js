let roundCount = 0;
let playerPoint = 0;
let computerPoint = 0;

function getRandomNum(max) {
    return Math.floor(Math.random() * max) + 1;
}

function getComputerChoice() {
/* Retrieves a randomized choice of rock, paper, or scissor */
    let rand = getRandomNum(3);

    switch (rand) {
        case 1:
            return 'Rock';
            break;
        case 2:
            return 'Paper';
            break;
        case 3:
            return 'Scissors';
            break;
        default:
            return 'Error! Something went wrong.';
    }
}

function getResult(playerSelection, computerSelection) {
/* Determines the winner for this round of the game */
    playerSelection = playerSelection.toUpperCase();
    computerSelection = computerSelection.toUpperCase();

    let loser_message = `You Lose! ${computerSelection} beats ${playerSelection}`;
    let winner_message = `You Win! ${playerSelection} beats ${computerSelection}`;

    if (playerSelection === computerSelection) {
        return `You Tied! You both chose ${playerSelection}`;
    } else if (playerSelection === 'ROCK') {
        switch (computerSelection) {
            case 'PAPER':
                return loser_message;
                break;
            case 'SCISSORS':
                return winner_message;
                break;
            default:
                return 'ERROR!'
        }    
    } else if (playerSelection === 'PAPER') {
        switch (computerSelection) {
            case 'SCISSORS':
                return loser_message;
            case 'ROCK':
                return winner_message;
            default:
                return 'ERROR!'
        }
    } else if (playerSelection === 'SCISSORS') {
        switch (computerSelection) {
            case 'ROCK':
                return loser_message;
            case 'PAPER':
                return winner_message;
            default:
                return 'ERROR!';
        }
    }
}

function resetGame() {
    roundCount = 0;
    playerPoint = 0;
    computerPoint = 0;

    const pointsSpan = document.querySelectorAll('div.Points > div span');
    pointsSpan.forEach(function(span) {span.textContent = ''});
    console.log(pointsSpan);

    const resultBox = document.querySelector('div.Result');
    resultBox.textContent = '';

    const playAgainButton = document.querySelector('button.Reset');
    const body = document.querySelector('body');
    body.removeChild(playAgainButton);

    game();
}

function addResetButton() {
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.classList.add('Reset');
    const body = document.querySelector('body');
    body.appendChild(playAgainButton);
    playAgainButton.addEventListener('click', resetGame);
}

function endGame() {
    const buttons = document.querySelectorAll('.RPS-buttons button');
    buttons.forEach(function(button) {button.removeEventListener('click', handleButton)});
    addResetButton();
}

function checkEnd(playerPoint, computerPoint, resultBox) {
/* Determines whether game is over by checking if either player or computer has 5 points. If so, message is displayed */
    if (playerPoint >= 5) {
        const finalMessage = document.createElement('div');
        finalMessage.textContent = 'Congratulations! You beat the computer in Rock-Paper-Scissors!';
        resultBox.appendChild(finalMessage);
        endGame();
    }
    else if (computerPoint >= 5) {
        const finalMessage = document.createElement('div');
        finalMessage.textContent = 'Game Over! You lost against the computer in Rock-Paper-Scissors!';
        resultBox.appendChild(finalMessage);
        endGame();
    }
}

function incrementRound() {
    roundCount++;
}

function addRoundMessage(result) {
    return `Round ${roundCount}: ${result}`;
}

function playRound(player, computer) {
/*  */
    let result = getResult(player, computer);

    if (result.includes('Win')) {
        playerPoint++;
    }
    else if (result.includes('Lose')) {
        computerPoint++;
    }

    incrementRound();
    result = addRoundMessage(result);

    const playerPointElem = document.querySelector('span.Player');
    playerPointElem.textContent = playerPoint;
    const computerPointElem = document.querySelector('span.Computer');
    computerPointElem.textContent = computerPoint;

    const resultBox = document.querySelector('div.Result');
    resultBox.textContent = result;
    // const responseLine = document.createElement('div');
    // responseLine.textContent = result;
    // resultBox.appendChild(responseLine);
    

    checkEnd(playerPoint, computerPoint, resultBox);
}

function handleButton(e) {
    playRound(e.target.textContent, getComputerChoice());
}

function game() {
    const buttons = document.querySelectorAll('.RPS-buttons button')
    buttons.forEach(function(button) {button.addEventListener('click', handleButton)})
}

game();