function getRandomNum(max) {
    return Math.floor(Math.random() * max) + 1;
}

function getComputerChoice() {
    let rand = getRandomNum(3);

    // if (rand === 1) {
    //     return 'Rock';
    // } else if (rand === 2) {
    //     return 'Paper';
    // } else if (rand === 3) {
    //     return 'Scissors';
    // } else {
    //     return 'ERROR! Something went wrong';
    // }
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

function askChoice() {
    return prompt('Please type in: Rock, Paper, or Scissors');
}

function playRound(playerSelection, computerSelection) {
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

function getWinner(player, computer) {
    if (player > computer) {
        return 'Player wins the game!';
    } else if (player < computer) {
        return 'Computer wins the game!';
    } else if (player === computer) {
        return 'Both Player and Computer tied!'
    }
}

function game() {
    const roundMax = 5;
    let playerScore = 0;
    let computerScore = 0;

    for (let roundCount = 1; roundCount <= roundMax; roundCount++) {
        let result = playRound(askChoice(), getComputerChoice());
        result = `Round ${roundCount}: ` + result; 
        console.log(result);
        if (result.includes('Win')) {
            playerScore++;
        } else if (result.includes('Lose')) {
            computerScore++;
        } else if (result.includes('Tied')) {
            playerScore++;
            computerScore++;
        }
    }

    let winnerMessage = getWinner(playerScore, computerScore);
    let scoreboardMessage = `Player: ${playerScore} | Computer: ${computerScore}`;
    let finalMessage = winnerMessage + '\n' + scoreboardMessage;
    console.log(finalMessage);
}

game();