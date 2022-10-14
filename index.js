const prompt = require('prompt-sync')({sigint: true});
const Card = require('./card')
const Bot = require('./bot');

const selfHand = [];

const clubs = prompt('Enter your clubs: ').split(' ');
console.log(`clubs: ${clubs}`);

clubs.forEach((card) => {
  selfHand.push(new Card('Clubs', card));
});

const diamonds = prompt('Enter your diamonds: ').split(' ');
console.log(`clubs: ${diamonds}`);

diamonds.forEach((card) => {
  selfHand.push(new Card('Diamonds', card));
});

const spades = prompt('Enter your spades: ').split(' ');
console.log(`clubs: ${spades}`);

spades.forEach((card) => {
  selfHand.push(new Card('Spades', card));
});

const hearts = prompt('Enter your hearts: ').split(' ');
console.log(`clubs: ${hearts}`);

hearts.forEach((card) => {
  selfHand.push(new Card('Hearts', card));
});


console.log('your hand: ');
selfHand.forEach((card) => {
  console.log(card);
});


const playerWhoStarted = prompt('Who led the 2 of clubs? (player 1(you), player 2(left), player 3(across), player 4(right))');
const indexOfPlayerWhoStarted = playerWhoStarted - 1;

const secondCardFirstTrickPrompt = prompt('Second card after 2 of clubs?').split('');
const secondCardFirstTrick = new Card(secondCardFirstTrickPrompt[0], secondCardFirstTrickPrompt[1]);

const thirdCardFirstTrickPrompt = prompt('Third card after 2 of clubs?').split('');
const thirdCardFirstTrick = new Card(thirdCardFirstTrick[0], thirdCardFirstTrick[1]);

const fourthCardFirstTrickPrompt = prompt('Fourth card after 2 of clubs?').split('');
const fourthCardFirstTrick = new Card(fourthCardFirstTrickPrompt[0], fourthCardFirstTrickPrompt[1]);

const firstTrick = [];

firstTrick[indexOfPlayerWhoStarted] = new Card('Clubs', '2');

// setup the first trick and the bot will do the rest
if (indexOfPlayerWhoStarted === 0) {
  // in this case the we started the game
  firstTrick[1] = secondCardFirstTrick;
  firstTrick[2] = thirdCardFirstTrick;
  firstTrick[3] = fourthCardFirstTrick;
} else if(indexOfPlayerWhoStarted === 1) {
  firstTrick[2] = secondCardFirstTrick;
  firstTrick[3] = thirdCardFirstTrick;
  firstTrick[0] = fourthCardFirstTrick;
} else if (indexOfPlayerWhoStarted === 2) {
  firstTrick[3] = secondCardFirstTrick;
  firstTrick[0] = thirdCardFirstTrick;
  firstTrick[1] = fourthCardFirstTrick;
} else if (indexOfPlayerWhoStarted === 3) {
  firstTrick[0] = secondCardFirstTrick;
  firstTrick[1] = thirdCardFirstTrick;
  firstTrick[2] = fourthCardFirstTrick;
}

// bot usage:
// first param your hand
// second param is the first trick

console.log(firstTrick);

// while (true) {

//   const bot = new Bot(selfHand, firstTrick);

//   bot.getBestCard();
//   const cardToPlay = new Card('Spades', 'Q');
//   console.log('you should play: ');
//   console.log(cardToPlay);
// }