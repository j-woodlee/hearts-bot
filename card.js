class Card {
  constructor(suit, value) {
    if (suit === 'C' || suit === 'c') {
      suit = 'Clubs';
    }

    if (suit === 'H' || suit === 'h') {
      suit = 'Hearts';
    }

    if (suit === 'S' || suit === 's') {
      suit = 'Spades';
    }

    if (suit === 'D' || suit === 'd') {
      suit = 'Diamonds';
    }

    this.suit = suit;
    this.value = value;
  }
}

module.exports = Card;