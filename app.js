/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variables
var scores, roundScore, activePlayer, gamePlaying;

init();

//document.querySelector('#current-' + activePlayer).textContent = dice;
// based on the activePlayer, the random values are assigned to that currentScore

// Also, one can add HTML content in the Javascript by means of INNERHTML
// document.querySelector('.player-current-label').innerHTML = '<h3>Hi</h3>';

// Initially, the dice should not show up, so set the display upto none
document.querySelector('.dice').style.display = 'none';

// var sample = document.querySelector('.player-name-3');
// var sample1 = document.getElementById('#name-0');

// console.log(sample);
// console.log(sample1);

// Anonymous function for dice roll button

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Display the random number in the current box and also in the dice image

    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';

    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the round score if the dice no. is not 1, else mark 0 and shift to next player

    if (dice !== 1) {
      roundScore = roundScore + dice; // update the roundScore
      document.getElementById(
        'current-' + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer(); // when player rolls 1, switch the active class to nextPlayer
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Global Score + Round Score

    scores[activePlayer] = scores[activePlayer] + roundScore;

    // 2. Update the UI

    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    // 3. Check if player won the game

    if (scores[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer(); // when player clicks hold, switch the active class to nextPlayer
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

//this function is for switching to the nextPlayer in 2 conditions :
//      1. when Player rolls 1
//      2. when player clicks hold

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}
