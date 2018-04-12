let isEqual = require('lodash/isEqual')
let range = require('lodash/range')
let shuffle = require('lodash/shuffle')
let take = require('lodash/take')
let takeR = require('lodash/takeRight')

let GameStatus = { NEW: 0, PLAYING: 1, FINISHED: 2 }
let randomNums = function() {
  return take(shuffle(range(10)), 4)
}

class Game {
  constructor() {
    this.status = GameStatus.NEW
  }

  start() {
    this.status = GameStatus.PLAYING
    this.secret = randomNums
    this.allGuesses = []
  }

  giveUp() {
    if (this.status === GameStatus.PLAYING) this.status = GameStatus.FINISHED
  }

  makeGuess() {
    if (this.status == GameStatus.PLAYING) {
      this.allGuesses.push(this.tentatives())
      if (this.tentatives() === 10) this.status = GameStatus.FINISHED
    }
  }

  guessesAll() { return this.allGuesses }
  guessesReverse() { return this.allGuesses.reverse() }
  guessesLast() { return takeR(this.allGuesses) }

  tentatives() {
    return this.allGuesses.length
  }

  isMatch(n) {
    return isEqual(n, this.secret)
  }
}

module.exports = Game
