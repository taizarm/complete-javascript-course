/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var activePlayer, scores, roundScore, gamePlaying, dice1, dice2, previousDice, finalScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        // 1. Random number
        previousDice = Math.max(dice1, dice2);
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the dices result
        updateDiceValue('.dice1', dice1);
        updateDiceValue('.dice2', dice2);

        // 3. Update the round score IF any dice is not 1
        //    Check if player has two 6 dices in a row
        if (previousDice === 6 && (dice1 === 6 || dice2 === 6)) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        // 1. Add to the global score
        scores[activePlayer] += roundScore;

        // 2. Update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = 0;

        // 3. Check if player won
        if (scores[activePlayer] >= finalScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            hideDices();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

})

function nextPlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;

    activePlayer === 0? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDices();

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    activePlayer = 0;
    scores = [0, 0];
    roundScore = 0;
    gamePlaying = true;

    //Read winning score
    finalScore = document.getElementById('final-score').value;

    if (!finalScore) {
        // Undefined, 0, null or "" will be coerced to false
        finalScore = 100
        document.getElementById('final-score').value = finalScore;
    }

    hideDices();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.player-1-panel').classList.remove('active');

}

function hideDices() {
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function updateDiceValue(selector, newValue) {
    var diceDOM = document.querySelector(selector);
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + newValue + '.png';
}