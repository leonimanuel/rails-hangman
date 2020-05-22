//On DOM CONTENT LOAD?
// console.log("yup")
let game
let user
let subcObject

(function getCategories() {
	fetch("http://localhost:3000/categories")
		.then(resp => resp.json())
		.then(function(cArr) {
			for (let c of cArr) {
				let div = document.createElement("div");
				div.id = `${c.name.toLowerCase()}-category`
				div.className = "category"
				div.innerText = c.name;

				div.addEventListener("click", function() {
					showSub(event, c, c.subcategories)
				})

				$("div#categories").append(div)
			}

		let random = document.createElement("div");
		random.id = "random-phrase";
		random.innerText = "Random";
		$("#categories").append(random);
		random.addEventListener("click", getRandomPhrase)
		})
		.catch(function(error) {
			alert("failed bruh")
		})
})()

function showSub(e, c, subcArray) {
	$("div#subcategories").empty();

	for (let subc of subcArray) {
		let div = document.createElement("div");
		div.id = `${subc.name.toLowerCase()}-subcategory`
		div.className = "subcategory"
		div.innerText = subc.name;

		div.addEventListener("click", function() {
			getPhrase(e, subc)
		})

		$("div#subcategories").append(div)	
	}
}

function getPhrase(e, subcObj) {
	fetch(`http://localhost:3000/subcategories/${subcObj.id}`)
		.then(resp => resp.json())
		.then(function(subcObj) {
			subcObject = subcObj
			let phraseObj = subcObj.phrases[Math.floor(Math.random() * subcObj.phrases.length)]
			console.log(phraseObj)

			startGame(phraseObj)
		})
}

function getRandomPhrase() {
	console.log("executing getRandomPhrase")
	fetch("http://localhost:3000/phrases")
		.then((resp => resp.json()))
		.then(function(object) {
			console.log(object)
			startGame(object)
		})
		.catch(function(err) {
			alert(err.message)
		})
}

function startGame(phraseObj) {
	$("div#board").empty()
	$("#guesses-box").empty()
	$("#hint-box").empty()

	game = new Game(phraseObj)

	if ($("#hangman-picture")[0].classList.contains("top")) {
		$("#hangman-picture").css({'transform' : `translate(${(game.hangmanTranslateHorizontal)}px, ${(game.hangmanTranslateVertical)}px)`});
	}

	let phraseArr = game.phraseContent.toUpperCase().split(" ")
	for (let i = 0; i < phraseArr.length; i++) {
		let wordArr = phraseArr[i].split("")
		let wordBox = document.createElement("div");
		wordBox.id = `word-box-${i}`
		wordBox.className = "word-box"
		$("#board").append(wordBox)


		for (let letter of wordArr) {
			let letterBox = document.createElement("div")
			letterBox.classList.add("letter-box", `letter-${letter}`)
			// letterBox.classlist.add(`letter-${letter}`)
			letterBox.innerText = letter
			$(`#word-box-${i}`).append(letterBox)
		}

		let space = document.createElement("div");
		space.id = "space"
		space.innerText = "---"
		$("div#board").append(space)
	}	

	$("#guess-container").removeClass("hidden");
	$("#hint-container").removeClass("hidden");	
}

//ADD LISTENER for #guess-box
let guessInput = document.getElementById("guess-input")
guessInput.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    // console.log(e.target.value)
    submitGuess(e.target.value)
    e.target.value = ""
  }
});

function submitGuess(guess) {
	guess = guess.toUpperCase()
	console.log("submitting guess")
	console.log(guess.charCodeAt(0))

	guess = guess.toUpperCase()

	if (validGuess(guess)) {
		let guessedLetter = document.createElement("div")
		guessedLetter.classList.add("guessed-letter", `guessed-${guess}`)
		guessedLetter.innerText = guess

		$("#guess-error").text("")
		if (game.phraseContent.toUpperCase().includes(guess)) {
			// console.log("yippie kay yay")
			guessedLetter.style.color = "green"
			$("#guesses-box").append(guessedLetter)

			for (let div of $("div.letter-box")) {
				if (div.innerText === guess) {
					div.style.color = "green"
					game.addGoodGuess()		
				}
			}
		} else {
			guessedLetter.style.color = "red"
			$("#guesses-box").append(guessedLetter)

			$("#hangman-picture").css({'transform' : `translate(${(game.hangmanTranslateHorizontal -= 65)}px, ${(game.hangmanTranslateVertical -= 15)}px)`});

			game.addStrike()
		}

		game.guessedLetters.push(guess)
	}

}

function gameOver(result) {
	console.log("executing gameOver")
	let gameType

	if (!game.subcategoryId) {
		gameType = "challenge"
	} else {
		gameType = "category"
		console.log("set gameType equal to category")
	}

	if (user) {
		let configObj = {
			method: "PATCH",
			headers: {
				"Content_Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				// solved: true
				game_type: gameType,
				result: result,
				game_phrase: game.phraseContent
			})
		}

		fetch(`http://localhost:3000/users/${user.id}`, configObj)
			.then(resp => resp.json())
			.then(function(userObj) {
				user = new User(userObj)
				console.log("SET NEW USER")
			})
			.catch(function(error) {
				console.log(error.message)
			})					
		
		setTimeout(function() {
			updateScoreboard()
		}, 1000)
	}

	$("#hangman-picture").addClass("top")
	
	if (!game.subcategoryId) { // aka If this was a challenge
		setTimeout( () => createChallengePopup(), 1200) );
		// updateUserChallenges(result)
	} else {
		setTimeout( () => gameOverPopup(result), 1200 );
	}
};

function updateScoreboard() {
	// console.log(`updating scoreboard. updated wins: ${user.wins}. Updated losses: ${user.losses}`)
	wins = document.getElementById("wins")
	wins.innerText = `wins: ${user.wins}`

	losses = document.getElementById("losses")
	losses.innerText = `losses: ${user.losses}`
}

function gameOverPopup(result) {
	console.log("game over bubeleh")
	$("#game-over-popup").removeClass("hidden");
	$("#game-over-header").text(`YOU ${result}`)
	$("#play-again-button-container")[0].addEventListener("click", function() {
		$("#game-over-popup").addClass("hidden");
		startGame(subcObject.phrases[Math.floor(Math.random() * subcObject.phrases.length)]);
	})
}

function guessError(errorString) {
	$("#guess-error").text(errorString)
	return false
}
















