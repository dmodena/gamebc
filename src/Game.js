let isEqual = require('lodash/isEqual')
let range = require('lodash/range')
let shuffle = require('lodash/shuffle')
let take = require('lodash/take')

let GameStatus = { NEW: 0, PLAYING: 1, FINISHED: 2 }
let GameOutcome = { NONE: 0, WON: 1, LOST: 2, QUIT: 3 }
let randomNums = function () {
  return take(shuffle(range(10)), 4)
}
let orderResult = function (x, y) {
  if (x === '+') {
    if (y === '+') return 0
    else return -1
  } else if (x === '-') {
    if (y === '+') return 1
    else if (y === '-') return 0
    else return -1
  } else return 1
}

class Game {
  constructor () {
    this.status = GameStatus.NEW
    this.outcome = GameOutcome.NONE
  }

  start () {
    this.status = GameStatus.PLAYING
    this.secret = randomNums()
    this.allGuesses = []
  }

  quit () {
    if (this.status === GameStatus.PLAYING) {
      this.status = GameStatus.FINISHED
      this.outcome = GameOutcome.QUIT
    }
  }

  makeGuess (g) {
    if (this.status === GameStatus.PLAYING) {
      this.allGuesses.push({guess: g, result: this.resultForGuess(g)})
      if (this.isMatch(g)) {
        this.status = GameStatus.FINISHED
        this.outcome = GameOutcome.WON
      }
      if (this.tentatives() === 10) {
        this.status = GameStatus.FINISHED
        this.outcome = (this.outcome === GameOutcome.WON) ? GameOutcome.WON : GameOutcome.LOST
      }
    }
  }

  resultForGuess (g) {
    let out = []
    for (let i = 0; i < g.length; i++) {
      if (g[i] === this.secret[i]) out.push('+')
      else if (this.secret.includes(g[i])) out.push('-')
      else out.push('.')
    }
    return out.sort(orderResult)
  }

  guessesAll () { return this.allGuesses }
  guessesReverse () { return this.allGuesses.reverse() }
  guessesLast () { return this.allGuesses[this.allGuesses.length - 1] }

  tentatives () {
    return this.allGuesses.length
  }

  isMatch (n) {
    return isEqual(n, this.secret)
  }

  static get GameStatus () { return GameStatus }
  static get GameOutcome () { return GameOutcome }
}

module.exports = Game
