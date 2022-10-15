const Card = require('./card');
const prompt = require('prompt-sync')({sigint: true});
class HeartsBot {
  constructor(playerCards) {
    this.deck =
      [
        new Card('Spades', '2'), new Card('Spades', '3'), new Card('Spades', '4'), new Card('Spades', '5'),
        new Card('Spades', '6'), new Card('Spades', '7'), new Card('Spades', '8'), new Card('Spades', '9'),
        new Card('Spades', '10'), new Card('Spades', 'J'), new Card('Spades', 'Q'), new Card('Spades', 'K'),
        new Card('Spades', 'A'),

        new Card('Hearts', '2'), new Card('Hearts', '3'), new Card('Hearts', '4'), new Card('Hearts', '5'),
        new Card('Hearts', '6'), new Card('Hearts', '7'), new Card('Hearts', '8'), new Card('Hearts', '9'),
        new Card('Hearts', '10'), new Card('Hearts', 'J'), new Card('Hearts', 'Q'), new Card('Hearts', 'K'),
        new Card('Hearts', 'A'),

        new Card('Diamonds', '2'), new Card('Diamonds', '3'), new Card('Diamonds', '4'), new Card('Diamonds', '5'), 
        new Card('Diamonds', '6'), new Card('Diamonds', '7'), new Card('Diamonds', '8'), new Card('Diamonds', '9'), 
        new Card('Diamonds', '10'), new Card('Diamonds', 'J'), new Card('Diamonds', 'Q'), new Card('Diamonds', 'K'), 
        new Card('Diamonds', 'A'),

        new Card('Clubs', '2'), new Card('Clubs', '3'), new Card('Clubs', '4'), new Card('Clubs', '5'), 
        new Card('Clubs', '6'), new Card('Clubs', '7'), new Card('Clubs', '8'), new Card('Clubs', '9'), 
        new Card('Clubs', '10'), new Card('Clubs', 'J'), new Card('Clubs', 'Q'), new Card('Clubs', 'K'), 
        new Card('Clubs', 'A'),
      ];

    this.playerCards = playerCards;
    this.heartsBroken = false;
  }

  start() {
    this.cardsPlayed = [];
    this.currentTrick = [undefined, undefined, undefined, undefined];
    this.previousTricks = [];
    let indexOfPlayerWhoStarted;
    this.playerCards.forEach((card) => {
      if (card.suit === 'Clubs' && card.value === '2') {
        indexOfPlayerWhoStarted = 0; // we start the game
        prompt('Press enter when you have played the 2 of clubs.');
        this.removeCardFromPlayerHand(new Card('Clubs', '2'));
      }
    });

    if (indexOfPlayerWhoStarted === undefined) {
      const playerWhoStarted = prompt('Which player played the 2 of clubs? 2(left), 3(across), 4(right)? ');
      indexOfPlayerWhoStarted = playerWhoStarted - 1;
    }

    // add two of clubs to trick
    const twoOfClubs = new Card('Clubs', '2');
    this.currentTrick[indexOfPlayerWhoStarted] = twoOfClubs;
    this.currentLead = indexOfPlayerWhoStarted;
    this.cardsPlayed.push(twoOfClubs);
  }

  consumeCard(card) {
    if (card.suit === 'Hearts') {
      console.log('hearts have been broken');
      this.heartsBroken = true;
    }
    this.addCardToTrick(card);
    this.cardsPlayed.push(card);

    // remove card from player hand if necessary
    this.removeCardFromPlayerHand(card);

    // trick is complete if current trick has 4 cards
    if (this.trickIsComplete()) {
      // the trick is over, calculate the winner and assign the next lead
      const ledSuit = this.currentTrick[this.currentLead].suit;
      let highestCard = this.currentTrick[this.currentLead];
      for (const c of this.currentTrick) {
        if (c.suit === ledSuit && c.isGreaterValueThan(highestCard)) {
          highestCard = c;
        }
      }
      
      this.currentLead = this.currentTrick.indexOf(highestCard);
      this.previousTricks.push(this.currentTrick);
      console.log('this.previousTricks: ');
      console.log(this.previousTricks);
      this.currentTrick = [undefined, undefined, undefined, undefined];
      if (this.playerCards.length === 0) {
        console.log('Hand is over!');
        // this.scoreHand();
        return;
      }
    }

    console.log('consumed: ' + card.value + ' of ' + card.suit);

    if (this.isMyTurn()) {
      // console.log('this.playerCards: ');
      // console.log(this.playerCards);
      const bestCard = this.getBestMove();
      console.log('it is your turn, the best move is: ' + bestCard.value + ' of ' + bestCard.suit);
    }
  }

  removeCardFromPlayerHand(card) {
    const indexOfCard = this.playerCards.findIndex((c) => {
      return card.suit === c.suit && card.value === c.value;
    });
    if (indexOfCard > - 1) {
      this.playerCards.splice(indexOfCard, 1);
    }
  }

  trickIsComplete() {
    console.log('this.currentTrick:');
    console.log(this.currentTrick);
    // see if current trick has all cards
    let fullCounter = 0;
    for (const c of this.currentTrick) {
      if (c) {
        fullCounter += 1;
      }
    }

    if (fullCounter === 4) {
      console.log('Trick is complete.');
      return true;
    }
    return false;
  }

  isMyTurn() {
    if (this.currentTrick.every(card => !card) && this.currentLead === 0 ) {
      return true;
    }
    
    if (this.currentTrick[0]) {
      return false;
    }

    for (let i = 1; i < 4; i++) {
      if (this.currentTrick[i]) {
        const nextPlayerIndex = (i+1) === 4 ? 0 : i + 1;
        if (!this.currentTrick[nextPlayerIndex] && nextPlayerIndex === 0) {
          return true;
        }
      }
    }

    return false;
  }

  getBestMove() {
    const possibleMoves = this.getPossibleMoves();
    console.log('possibleMoves: ');
    console.log(possibleMoves);
    return possibleMoves[0];
  }

  getPossibleMoves() {
    if (this.currentTrick[this.currentLead] === undefined) {
      // we are leading
      if (this.heartsBroken) {
        return this.playerCards;
      }
      return HeartsBot.noHearts(this.playerCards);
    }

    const ledSuit = this.currentTrick[this.currentLead].suit;

    const playerCardsOfLedSuit = [];
    for (const c of this.playerCards) {
      if (c.suit === ledSuit) {
        playerCardsOfLedSuit.push(c);
      }
    }

    if (playerCardsOfLedSuit.length > 0) {
      return playerCardsOfLedSuit;
    }

    // we are out of the suit
    return this.playerCards;
  }

  static noHearts(cards) {
    let cardsNoHearts = [...cards];
    cards.forEach((card) => {
      if (card.suit === 'Hearts') {
        const indexOfCard = cardsNoHearts.indexOf(card);
        cardsNoHearts.splice(indexOfCard, 1);
      }
    });
    return cardsNoHearts;
  }

  // adds card to the current trick in the correct position
  addCardToTrick(card) {
    let foundCard = false;
    for (let i = 0; i < 4; i++) {
      if (this.currentTrick[i]) {
        foundCard = true;
        if ((i + 1) < 4 && !this.currentTrick[i + 1]) {
          this.currentTrick[i + 1] = card;
          return;
        } else if ((i + 1) === 4) {
          this.currentTrick[0] = card;
          return;
        }
      }
    }

    if (!foundCard) {
      // there are no cards in the trick
      this.currentTrick[this.currentLead] = card;
    }
  }

  // return highest card of each suit remaining in the game, 0=H, 1=Diamonds, 2=C, 3=S
  getHighestOfEachSuit = () => {
    const highestOfEachSuit = [new Card('Hearts', 'A'), new Card('Diamonds', 'A'), new Card('Clubs', 'A'), new Card('Spades', 'A')];

    // cards played is sorted
    for (let i = this.cardsPlayed.length; i >= 0; i--) {
      switch (this.cardsPlayed[i].suit) {
        case 'H':
          // code block
          if (this.cardsPlayed[i].value == highestOfEachSuit[0]) {
            highestOfEachSuit[0].value--;
          }
          break;
        case 'Diamonds':
          if (this.cardsPlayed[i].value == highestOfEachSuit[1]) {
            highestOfEachSuit[1].value--;
          }
          break;
        case 'Clubs':
          if (this.cardsPlayed[i].value == highestOfEachSuit[2]) {
            highestOfEachSuit[2].value--;
          }
          break;
        case 'S':
          if (this.cardsPlayed[i].value == highestOfEachSuit[3]) {
            highestOfEachSuit[3].value--;
          }
          break;
        default:
          throw new Exception('Invalid suit in Card deck');
      }
    }

    return highestOfEachSuit;
  };
}

module.exports = HeartsBot;
