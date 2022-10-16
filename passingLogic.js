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

  // get the suits that we have 2 or less of, exclude spades
  const twoOrLess = [];
  if (heartsCount <= 2) {
    twoOrLess.push('Hearts');
  }
  if (clubsCount <= 2) {
    twoOrLess.push('Clubs');
  }
  if (diamondsCount <= 2) {
    twoOrLess.push('Diamonds');
  }
  if (spadesCount <= 2) {
    twoOrLess.push('Spades');
  }

  let possibleCardsToPass = [...hand];
  // never pass the ace of hearts, ace of clubs, or any spades
  possibleCardsToPass = possibleCardsToPass.filter((card) => {
    if (card.value === 'A' && card.suit === 'Hearts') {
      return false;
    }

    if (card.value === 'A' && card.suit === 'Clubs') {
      return false;
    }

    if (card.suit !== 'Spades') {
      return false;
    }

    return true;
  });

  if (heartsCount > 3) {
    // do not pass hearts if we have more than 3 of them
    possibleCardsToPass = possibleCardsToPass.filter(card => {
      return card.value === '2' && card.suit === '';
    });
  }

  
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