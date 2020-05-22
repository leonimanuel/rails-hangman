function isLetterOrSpace(letter) {
	return (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) || letter.charCodeAt(0) === 32
}


function validChallenge() {
	if (document.getElementById("challenge-phrase-error")) { $("#challenge-phrase-error").remove()}

	if ($("#challenge-phrase-input").val().toUpperCase().split("").every(isLetterOrSpace)) {
		// return true
		console.log("gut")
		return true;
	} else {
		// return false
		console.log("bad")
		console.log($("#challenge-phrase-input").val().toUpperCase().split(""))
		let contentError = document.createElement("div");
		contentError.id = "challenge-phrase-error"
		contentError.innerText = "Challenge can only include letters and spaces"
		$("#challenge-phrase-input").after(contentError)

		return false;
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