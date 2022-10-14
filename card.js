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
    this.value = value.toString().toUpperCase();
  }

  isGreaterValueThan(card) {
    if (this.value === card.value) {
      return false;
    }

    // both are number cards
    if (!isNaN(this.value) && !isNaN(card.value)) {
      return parseInt(this.value) > parseInt(card.value);
    }

    // this is a number and card is a face card
    if (!isNaN(this.value) && isNaN(card.value)) {
      return false;
    }

    // this is a face card and card is a number
    if (isNaN(this.value) && !isNaN(card.value)) {
      return true;
    }

    // at this point the only comparisons left are face card to face card
    if (this.value === 'A') {
      return true;
    }

    if (card.value === 'A') {
      return false;
    }

    if (this.value === 'K') {
      return true;
    }

    if (card.value === 'K') {
      return false;
    }

    if (this.value === 'Q') {
      return true;
    }

    if (card.value === 'Q') {
      return false;
    }

    if (this.value === 'J') {
      return false;
    }
  }
}

module.exports = Card;