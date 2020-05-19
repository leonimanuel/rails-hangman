//On DOM CONTENT LOAD?
// console.log("yup")
let game
let user

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
			// let randomPhraseObj = subcObj.phrases[Math.floor(Math.random() * subcObj.phrases.length)]
			startGame(subcObj)
			// console.log(randomPhraseObj.content)
		})
}

function startGame(subcObj) {
	$("div#board").empty()
	$("#guesses-box").empty()

	game = new Game(subcObj)

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
	let guessedBox = document.createElement("div")
	guessedBox.classList.add("guessed-box", `guessed-${guess}`)
	guessedBox.innerText = guess

	guess = guess.toUpperCase()

	if (game.phraseContent.includes(guess)) {
		guessedBox.style.color = "green"
		$("#guesses-box").append(guessedBox)

		console.log("sweet")
		for (let div of $("div.letter-box")) {
			if (div.innerText === guess) {
				div.style.color = "green"
				game.addGoodGuess()		
			}
		}

	} else {
		guessedBox.style.color = "red"
		$("#guesses-box").append(guessedBox)

		console.log("eyo")
		$("#hangman-picture").css({'transform' : `translate(${(game.hangmanTranslateHorizontal -= 65)}px, ${(game.hangmanTranslateVertical -= 15)}px)`});

		game.addStrike()
	}
}

function gameOver(result) {
	console.log("executing gameOver")
	if (user) {
		console.log("right here baby")
		let configObj = {
			method: "PATCH",
			headers: {
				"Content_Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				result: result
			})
		}

		fetch(`http://localhost:3000/users/${user.id}`, configObj)
			.then(resp => resp.json())
			.then(function(object) {
				user.wins = object.wins
				user.losses = object.losses
				console.log(`new wins: ${object.wins}`)
				console.log(`new losses: ${object.losses}`)
				updateScoreboard()
			})
			.catch(function(error) {
				console.log(error.message)
			})					
	}
	
	if (result === "WIN") {
		console.log("You just saved my neck, partner")

	} else if (result === "LOSE") {
		console.log("Hang me, oh hang me")
	}
	
	$("#hangman-picture").addClass("top")
	
	gameOverPopup(result)
};

function updateScoreboard() {
	console.log("updating scoreboard")
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
		startGame(game.subcObj);
	})
}
























