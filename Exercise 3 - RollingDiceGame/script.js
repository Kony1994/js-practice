'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const closeBtn = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

document.querySelector('.playerName').classList.remove('hidden');
document.querySelector('.player1Name').classList.add('hidden');
document.querySelector('.h1name').textContent = 'Type a name of player 1';
let nameP1;
let nameP2;

document.addEventListener('keydown', function (k) {
  if (k.key === 'Enter') {
    nameP1 = document.querySelector('.pName').value;
    document.getElementById('name--0').textContent = nameP1;
    document.querySelector('.playerName').classList.add('hidden');
    document.querySelector('.player1Name').classList.remove('hidden');
    document.querySelector('.h1name').textContent = 'Type a name of player 2';
    document.addEventListener('keydown', function (l) {
      if (l.key === 'Enter') {
        nameP2 = document.querySelector('.p1Name').value;
        document.getElementById('name--1').textContent = nameP2;
        document.querySelector('.player1Name').classList.add('hidden');
      }
    });
  }
});

let scores, currentScore, activePlayer, playing;

const initialization = function () {
  scores = [0, 0]; // punkty startowe, potrzebne do ustalenia aktywnego gracza
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden'); //schowanie kostki przed pierwszym losowaniem
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

initialization();

// zmiana aktywnego gracza

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//console.log(activePlayer);

//funkcjonalność rolowania kostką

btnRoll.addEventListener('click', function () {
  if (playing) {
    // jeżeli gra się toczy
    const dice = Math.trunc(Math.random() * 6) + 1; //generowanie losowej liczby z zakresu 1-6
    diceEl.classList.remove('hidden'); //kostka widoczna
    diceEl.src = `dice-${dice}.png`; //wczytywanie odpowiedniego obrazka z ilością oczek = wygenerowana cyfra

    if (dice !== 1) {
      currentScore += dice; // dodawanie wylosowanego wyniku do aktualnego stanu punktów
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //wyświetlanie nieżącego wyniku dla aktywnego gracza
    } else {
      switchPlayer(); //wywoływanie funkcji zmieniającej gracza w przypadku wylosowania 1
    }
  }
});

//funkcjonalność przycisku HOLD

btnHold.addEventListener('click', function () {
  if (playing) {
    //jeżeli gra się toczy
    scores[activePlayer] += currentScore; //dodaj bieżący wynik do wyniku całkowitego
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // dodawanie obecnego wyniku do wyniku całkowitego

    if (scores[activePlayer] >= 20) {
      playing = false; //jezeli wynik wiekszy od 100, koniec gry
      diceEl.classList.add('hidden'); //obraz kostki znika
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // aktywny w danym momencie gracz wygrywa
      openModal();
      document.querySelector('.winnerText').textContent = `${
        activePlayer === 0 ? nameP1 : nameP2
      } won the game! If you want to play again, press X or ESCAPE button and then press PLAY AGAIN BUTTON`;
    } else {
      switchPlayer(); //jezeli punkty dalej poniżej 100, zmiana gracza
    }
  }
});

closeBtn.addEventListener('click', function () {
  closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnNew.addEventListener('click', function () {
  initialization();
});
