const chai = require('chai');
const Card = require('../card');
const getCardsToPass = require('../passingLogic');
chai.should();

const hand1 = [
  new Card('Clubs', '2'),
  new Card('Spades', '5'),
  new Card('Hearts', 'A'),
  new Card('Clubs', 'A'),
  new Card('Hearts', 'K'),

  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),

  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),
];

const hand2 = [
  new Card('Clubs', '10'),
  new Card('Spades', '5'),
  new Card('Hearts', 'A'),
  new Card('Clubs', 'A'),
  new Card('Hearts', 'K'),

  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),

  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),
  new Card('Hearts', 'K'),
];

describe('Users', () => {

  before(async () => {
  });

  beforeEach(async () => {
  });

  afterEach(async () => {
  });

  it('should pass some cards', () => {
    getCardsToPass(hand2, 1);
  });
});
