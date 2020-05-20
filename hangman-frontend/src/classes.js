class Game {
	constructor(phraseObj) {
		// console.log(phraseObj)
		// this.category = category;
		// this.subcObj = subcObj;
		this.phraseObj = phraseObj
		this.phraseId = phraseObj.id
		this.subcategoryObj = phraseObj.subcategory	
		this.subcategoryId = phraseObj.subcategory_id
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
		if (this.goodGuesses === this.phraseContent.split(" ").join("").length) {
			// console.log("executing goodguess/win")
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
	constructor(userObj) {
		this.id = userObj.id
		this.name = userObj.name;
		this.email = userObj.email
		this.wins = userObj.wins
		this.losses = userObj.losses
		this.receivedChallengesObjArr = userObj.received_challenges
		this.sentChallengesObjArr = userObj.sent_challenges
	}
}
