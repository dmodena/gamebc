describe("Game", function() {
  let Game = require('../src/Game')

  it("should end the game when the player runs out of guesses", function() {
    game = new Game()
    expect(game.status).toBe(Game.GameStatus.NEW)
    game.start()
    let g = game.isMatch([0, 1, 2, 3]) ? [1, 2, 3, 4] : [0, 1, 2, 3]
    game.makeGuess(g) // Guess 1
    expect(game.status).toBe(Game.GameStatus.PLAYING)
    game.makeGuess(g)
    game.makeGuess(g)
    game.makeGuess(g)
    game.makeGuess(g)
    game.makeGuess(g)
    game.makeGuess(g)
    game.makeGuess(g)
    game.makeGuess(g) // Guess 9
    expect(game.status).toBe(Game.GameStatus.PLAYING)
    game.makeGuess(g) // Guess 10
    expect(game.status).toBe(Game.GameStatus.FINISHED)
    game.makeGuess(g) // Guess 11
    expect(game.status).toBe(Game.GameStatus.FINISHED)
  })

  it("should return right game status", function() {
    game = new Game()
    expect(game.status).toBe(Game.GameStatus.NEW)
    game.start()
    expect(game.status).toBe(Game.GameStatus.PLAYING)
    game.giveUp()
    expect(game.status).toBe(Game.GameStatus.FINISHED)
  })
})
