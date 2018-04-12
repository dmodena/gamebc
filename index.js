let rl = require('readline-sync')
let Game = require('./src/Game')

game = new Game()
console.log('Starting new game..')
game.start()
while(game.status === 1) {
  console.log(`You have ${10 - game.tentatives()} left`)
  let guess = rl.question('Place your guess: ')
  let guessp = guess.split('').map(function (n) { return parseInt(n) })
  game.makeGuess(guessp)
  console.log(game.guessesLast().result.join(' '))
  console.log('\n')
}
console.log(`The secret was ${game.secret}`)
