const cards = document.querySelectorAll('.card');
const btn = document.querySelector('button');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;


function flipCard() {
    if (lockBoard) return;
     if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;

    checkForMatch();
  }
 
  function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
     isMatch ? disableCards() : unflipCards();
 }

 function disableCards() {
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);
   resetBoard();
 }

 function unflipCards() {
  lockBoard = true;
   setTimeout(() => {
     firstCard.classList.remove('flip');
     secondCard.classList.remove('flip');
     resetBoard();
   }, 1500);
 }

 function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();


function shuffle() {
  if (firstCard == undefined) {
    return 0;
  } else {
    firstCard.classList.remove('flip');
  }
  resetBoard();
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
};

btn.addEventListener('click', shuffle);
cards.forEach(card => card.addEventListener('click', flipCard));