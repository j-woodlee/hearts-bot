const prompt = require('prompt-sync')({sigint: true});
const Card = require('./card')
const Bot = require('./bot');

// cardgames.io/hearts

const selfHand = [];

const clubs = prompt('Enter your clubs: ').split(' ').filter((e) => {
  return e !== '';
});

console.log(`clubs: ${clubs}`);

clubs.forEach((card) => {
  if (card.value === '') {
    return;
  }
  selfHand.push(new Card('Clubs', card));
});

const diamonds = prompt('Enter your diamonds: ').split(' ').filter((e) => {
  return e !== '';
});

console.log(`diamonds: ${diamonds}`);

diamonds.forEach((card) => {
  if (card.value === '') {
    return;
  }
  selfHand.push(new Card('Diamonds', card));
});

const spades = prompt('Enter your spades: ').split(' ').filter((e) => {
  return e !== '';
});

console.log(`spades: ${spades}`);

spades.forEach((card) => {
  if (card.value === '') {
    return;
  }
  selfHand.push(new Card('Spades', card));
});

const hearts = prompt('Enter your hearts: ').split(' ').filter((e) => {
  return e !== '';
});

console.log(`hearts: ${hearts}`);

hearts.forEach((card) => {
  if (card.value === '') {
    return;
  }
  selfHand.push(new Card('Hearts', card));
});

console.log('your hand: ');
selfHand.forEach((card) => {
  if (card.value === '') {
    return;
  }
  console.log(card);
});

const createCardFromInput = (input) => {
  const arr = input.split('');
  if (arr[0] === '1') {
    // we have a 10
    return new Card(arr[2], '10');
  }

  return new Card(arr[1], arr[0]);
}

// new Card(suit, value)
// bot usage:
// first param is your hand

const bot = new Bot(selfHand);

bot.start();

while (true) {
  const card = createCardFromInput(prompt('Enter the next card: '));
  bot.consumeCard(card);
}