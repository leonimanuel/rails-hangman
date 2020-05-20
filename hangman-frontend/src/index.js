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
			getPhrase(e, c, subc)
		})

		$("div#subcategories").append(div)	
	}
}

function getPhrase(e, cObj, subcObj) {
	fetch(`http://localhost:3000/subcategories/${subcObj.id}`)
		.then(resp => resp.json())
		.then(function(subcObj) {
			subcObject = subcObj
			let phraseObj = subcObj.phrases[Math.floor(Math.random() * subcObj.phrases.length)]
			console.log(phraseObj)

			startGame(phraseObj)
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
	for (word of phraseArr) {
		let wordArr = word.split("")

		for (let letter of wordArr) {
			let letterBox = document.createElement("div")
			letterBox.classList.add("letter-box", `letter-${letter}`)
			// letterBox.classlist.add(`letter-${letter}`)
			letterBox.innerText = letter
			$("div#board").append(letterBox)
		}

		let space = document.createElement("div");
		space.id = "space"
		space.innerText = "--"
		$("div#board").append(space)
	}	


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
	console.log("submitting guess")

	let guessedBox = document.createElement("div")
	guessedBox.classList.add("guessed-box", `guessed-${guess}`)
	guessedBox.innerText = guess

	guess = guess.toUpperCase()

	if (game.phraseContent.toUpperCase().includes(guess)) {
		// console.log("yippie kay yay")
		guessedBox.style.color = "green"
		$("#guesses-box").append(guessedBox)

		for (let div of $("div.letter-box")) {
			if (div.innerText === guess) {
				div.style.color = "green"
				game.addGoodGuess()		
			}
		}

	} else {
		guessedBox.style.color = "red"
		$("#guesses-box").append(guessedBox)

		$("#hangman-picture").css({'transform' : `translate(${(game.hangmanTranslateHorizontal -= 65)}px, ${(game.hangmanTranslateVertical -= 15)}px)`});

		game.addStrike()
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

	console.log(gameType)
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
				// user.wins = object.wins
				// user.losses = object.losses
				// console.log(`new wins: ${object.wins}`)
				// console.log(`new losses: ${object.losses}`)
			})
			.catch(function(error) {
				console.log(error.message)
			})					
	}

	$("#hangman-picture").addClass("top")
	
	if (!game.subcategoryId) { // aka If this was a challenge
		// updateUserChallenges(result)
		createChallengePopup()

	} else {
		gameOverPopup(result)
	}

	setTimeout(function() {
		updateScoreboard()
	}, 1000)
};

function updateScoreboard() {
	console.log(`updating scoreboard. updated wins: ${user.wins}. Updated losses: ${user.losses}`)
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

























