//On DOM CONTENT LOAD?
// console.log("yup")
let game
let user

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
			gameOver("win")
		}
	}

	addStrike() {
		this.strikes += 1
		if (this.strikes >= 5) {
			gameOver("lose")
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
		setTimeout(function() {
			$("#hangman-picture").css({'transform' : `translate(${(game.hangmanTranslateHorizontal)}px, ${(game.hangmanTranslateVertical)}px)`});
		}, 1000)
	}

	let phraseArr = game.phraseContent.split("")
	for (let letter of phraseArr) {
		let letterBox = document.createElement("div")
		letterBox.classList.add("letter-box", `letter-${letter}`)
		// letterBox.classlist.add(`letter-${letter}`)
		letterBox.innerText = letter
		$("div#board").append(letterBox)
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
	console.log("eyo")
	$("#hangman-picture").css({'transform' : `translate(${(game.hangmanTranslateHorizontal -= 65)}px, ${(game.hangmanTranslateVertical -= 15)}px)`});

	let guessedBox = document.createElement("div")
	guessedBox.classList.add("guessed-box", `guessed-${guess}`)
	guessedBox.innerText = guess

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

		game.addStrike()
	}
}

function gameOver(result) {
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
				console.log("updated wins/losses")
				updateScoreboard()
			})
			.catch(function(error) {
				console.log(error.message)
			})					
	}
	
	if (result === "win") {
		console.log("You just saved my neck, partner")

	} else if (result === "lose") {
		console.log("Hang me, oh hang me")
	}
	
	$("#hangman-picture").addClass("top")

	startGame(game.subcObj)
};

function updateScoreboard() {
	console.log("updating scoreboard")
	wins = document.getElementById("wins")
	wins.innerText = `wins: ${user.wins}`

	losses = document.getElementById("losses")
	losses.innerText = `losses: ${user.losses}`
}

