'use strict';

//defining a random secret number in range between 1 - 25

let secretNum = Math.trunc(Math.random() * 100 + 1);
let attemptLeft = 15;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

console.log(secretNum);

document.querySelector('.check').addEventListener('click', function () {
  const guessNum = Number(document.querySelector('.guess').value);

  if (guessNum === secretNum) {
    document.querySelector('body').style.backgroundColor = '#60b347';
    displayMessage('YOU WON!');
    if (attemptLeft > highScore) {
      highScore = attemptLeft;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guessNum !== secretNum) {
    if (!guessNum) {
      displayMessage('No number!');
    } else if (guessNum > 100 || guessNum < 1) {
      displayMessage('number out of range!');
    } else if (attemptLeft > 1) {
      guessNum > secretNum
        ? displayMessage('Too high!')
        : displayMessage('Too low!');
      attemptLeft--;
      displayScore(attemptLeft);
    } else {
      displayMessage('you lost!');
      displayScore(0);
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNum = Math.trunc(Math.random() * 100);
  document.querySelector('body').style.backgroundColor = '#222';
  attemptLeft = 15;
  displayScore(attemptLeft);
  displayMessage('Start guessing...');
});
