class Game {
	constructor(subcObj) {
		// this.category = category;
		this.subcObj = subcObj;
		this.phraseObj = this.subcObj.phrases[Math.floor(Math.random() * subcObj.phrases.length)]
		this.phraseContent = this.phraseObj.content;
		this.hint = this.phraseObj.hint
		this.strikes = 0
		this.hangmanTranslateHorizontal = 0
		this.hangmanTranslateVertical = 0
		this.goodGuesses = 0
		// this.turns = turns;
		// this.result = result;
	}

	addGoodGuess() {
		this.goodGuesses += 1
		if (this.goodGuesses === this.phraseContent.length) {
			gameOver("WIN")
		}
	}

	addStrike() {
		this.strikes += 1
		if (this.strikes >= 3) {
			gameOver("LOSE")
		}
	}
}

class User {
	constructor(id, name, email, wins, losses) {
		this.id = id
		this.name = name;
		this.email = email
		this.wins = wins
		this.losses = losses
	}

	// get wins() {
	// 	this.wins =
	// }
}
