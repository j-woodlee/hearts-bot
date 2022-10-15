const Card = require('./card');

// passee is 1 (left), 2 (across), or 3(right)
const getCardsToPass = (hand, passee) => {
  // count all our cards
  let spadesCount = 0;
  let heartsCount = 0;
  let clubsCount = 0;
  let diamondsCount = 0;

  for (const card of hand) {
    if (card.suit === 'Spades') {
      spadesCount++;
    }
    if (card.suit === 'Hearts') {
      heartsCount++;
    }
    if (card.suit === 'Diamonds') {
      diamondsCount++;
    }
    if (card.suit === 'Clubs') {
      clubsCount++;
    }
  }
  
  // always pass the 2 of clubs
  // never pass the ace of hearts, ace of clubs, or spades
  let possibleCardsToPass = [...hand];

  // filter out all spades, AC, and AH, since we don't pass those
  possibleCardsToPass = possibleCardsToPass.filter((card) => {
    if (card.value === 'A' && card.suit === 'Hearts') {
      return false;
    }

    if (card.value === 'A' && card.suit === 'Clubs') {
      return false;
    }

    return card.suit !== 'Spades';
  });

  console.log('possibleCardsToPass: ');
  console.log(possibleCardsToPass);

  // always pass the 2 of clubs
  let [twoOfClubs] = possibleCardsToPass.filter(card => {
    return card.value === '2' && card.suit === 'Clubs';
  });

  let cardsToPass = [];
  if (twoOfClubs) {
    cardsToPass.push(twoOfClubs);
  }

  // we're already passing 2 of clubs, so remove it
  possibleCardsToPass = removeCard(possibleCardsToPass, twoOfClubs);

  console.log('cardsToPass: ');
  console.log(cardsToPass);
}

const removeCard = (cards, card) => {
  const indexOfCard = cards.findIndex((c) => {
    return card.suit === c.suit && card.value === c.value;
  });

  if (indexOfCard > - 1) {
    cards.splice(indexOfCard, 1);
  }

  return cards;
}

module.exports = getCardsToPass;