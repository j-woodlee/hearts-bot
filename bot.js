const Card = require('./card');

class HeartsBot { // one instance of this per game
  constructor(playerCards, firstTrick) {
    this.deck =
      [
        new Card('Spades', 2), new Card('Spades', 3), new Card('Spades', 4), new Card('Spades', 5),
        new Card('Spades', 6), new Card('Spades', 7), new Card('Spades', 8), new Card('Spades', 9),
        new Card('Spades', 10), new Card('Spades', 'J'), new Card('Spades', Q), new Card('Spades', K),
        new Card('Spades', A), new Card('Spades', 15), new Card('Spades', 16),

        new Card('Hearts', 2), new Card('Hearts', 3), new Card('Hearts', 4), new Card('Hearts', 5),
        new Card('Hearts', 6), new Card('Hearts', 7), new Card('Hearts', 8), new Card('Hearts', 9),
        new Card('Hearts', 10), new Card('Hearts', J), new Card('Hearts', Q), new Card('Hearts', K),
        new Card('Hearts', A),

        new Card('Diamonds', 2), new Card('Diamonds', 3), new Card('Diamonds', 4), new Card('Diamonds', 5), new Card('Diamonds', 6),
        new Card('Diamonds', 7), new Card('Diamonds', 8), new Card('Diamonds', 9), new Card('Diamonds', 10),
        new Card('Diamonds', J), new Card('Diamonds', Q), new Card('Diamonds', K), new Card('Diamonds', A),

        new Card('Clubs', 2), new Card('Clubs', 3), new Card('Clubs', 4), new Card('Clubs', 5), new Card('Clubs', 6),
        new Card('Clubs', 7), new Card('Clubs', 8), new Card('Clubs', 9), new Card('Clubs', 10),
        new Card('Clubs', J), new Card('Clubs', Q), new Card('Clubs', K), new Card('Clubs', A),
      ];

    this.playerCards = playerCards;
    this.firstTrick = firstTrick;
    this.currentCards = [];
    this.cardsPlayed = [];
  }

  /*

    cardsPlayed: Array of 52 cards, fills up as the hand goes on
    table: array of 3, position zero is lead, the rest is sequential
    myLead: true or false
    spadesBroken: true or false
    */
  takeTurn = (cardsPlayed, table, myLead, spadesBroken) => { // returns a card form 'myCards'
    // sort cards played by value
    cardsPlayed.sort((a, b) => {
      if (a.value < b.value) {
        return -1;
      }
      if ( a.value > b.value ) {
        return 1;
      }
      return 0;
    });

    // get all possible moves within the rules of the game, table[0] is lead card
    const possibleMoves = this.calculatePossibleMoves(myLead, table[0], spadesBroken);

    // calculate highest of each suit
    const highestOfEachSuit = this.getHighestOfEachSuit(cardsPlayed);

    if (bids[0] > 0 && bids[1] > 0 && bids[2] > 0 && bids[3] > 0) { // no one is going nil, take turn greedily
      return takeTurnGreedily(this.myCards, cardsPlayed, table, highestOfEachSuit);
    }

    // someone is going nil
  };

  getPossibleMoves = (myLead, leadCard, heartBroken) => {
    let possibleMoves = [];

    if (!mylead) {
      for (let i = 0; i < myCards.length; i++) { // only possible moves are the cards of the lead suit
        if (myCards[i].suit == leadCard.suit) {
          possibleMoves.add(myCard[i]);
        }
      }

      if (possibleMoves.length == 0) { // out of the suit
        possibleMoves = myCards;
      }

      if (!spadesBroken) { // remove all spades from possible moves
        for (let i = 0; i < possibleMoves; i++) {
          if (possibleMoves[i].suit == 'S') {
            possibleMoves.remove(possibleMoves[i]);
          }
        }
      }
    } else if (myLead) {
      possibleMoves = myCards;

      if (!spadesBroken) { // remove all spades from possible moves
        for (let i = 0; i < possibleMoves; i++) {

        }
      }
    }

    return possibleMoves;
  };

  // return highest card of each suit remaining in the game, 0=H, 1=Diamonds, 2=C, 3=S
  getHighestOfEachSuit = (cardsPlayed) => {
    const highestOfEachSuit = [new Card('H', A), new Card('Diamonds', A), new Card('Clubs', A), new Card('S', 16)];

    // cards played is sorted
    for (let i = cardsPlayed.length; i >= 0; i--) {
      switch (cardsPlayed[i].suit) {
        case 'H':
          // code block
          if (cardsPlayed[i].value == highestOfEachSuit[0]) {
            highestOfEachSuit[0].value--;
          }
          break;
        case 'Diamonds':
          if (cardsPlayed[i].value == highestOfEachSuit[1]) {
            highestOfEachSuit[1].value--;
          }
          break;
        case 'Clubs':
          if (cardsPlayed[i].value == highestOfEachSuit[2]) {
            highestOfEachSuit[2].value--;
          }
          break;
        case 'S':
          if (cardsPlayed[i].value == highestOfEachSuit[3]) {
            highestOfEachSuit[3].value--;
          }
          break;
        default:
          throw new Exception('Invalid suit in Card deck');
          return;
      }
    }

    return highestOfEachSuit;
  };
}

module.exports = HeartsBot;
