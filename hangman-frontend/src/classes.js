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
	constructor(subcObj) {
		this.id = subcObj.id
		this.name = subcObj.name;
		this.email = subcObj.email
		this.wins = subcObj.wins
		this.losses = subcObj.losses
		this.sentChallengesObjArr = subcObj.sent_challenges
		this.receivedChallengesObjArr = subcObj.received_challenges
	}
}
