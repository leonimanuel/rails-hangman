const isLetterOrSpace = (letter) => (letter.charCodeAt(0) > 65 && letter.charCodeAt(0) < 90) || letter.charCodeAt(0) === 32;

function validChallenge(input) {
	if (input.toUpperCase().split("").every(isLetterOrSpace)) {
		console.log("gut")
	} else {
		console.log("bad")
	}
}

//GUESSES
function validGuess(guess) {
	if (guess.charCodeAt(0) < 65 || guess.charCodeAt(0) > 90) {
		guessError("Guess must be an English letter")
	} else if (game.guessedLetters.includes(guess)) {
		guessError("You already guessed that!")
	} else if (guess === "" || guess.charCodeAt(0) === 32) {
		guessError("Please enter a guess")
	} else {
		return true
	}
}

// $("#challenge-phrase-input").val()