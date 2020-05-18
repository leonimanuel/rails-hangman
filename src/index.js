//On DOM CONTENT LOAD?
// console.log("yup")
let game

class Game {
	constructor(subcategory, phraseObj) {
		// this.category = category;
		this.subcategory = subcategory.name;
		this.phraseObj = phraseObj
		this.phraseContent = phraseObj.content;
		this.hint = phraseObj.hint
		this.strikes = 0
		// this.turns = turns;
		// this.result = result;
	}

	// set strikes(strike) {
	// 	console.log(strike)
	// }
	addStrike() {
		this.strikes += 1
		if (this.strikes >= 5) {
			gameOver()
			// console.log("game over")
		}
	}
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
			let randomPhraseObj = subcObj.phrases[Math.floor(Math.random() * subcObj.phrases.length)]
			startGame(subcObj, randomPhraseObj)
			// console.log(randomPhraseObj.content)
		})
}

function startGame(subcObj, phraseObj) {
	$("div#board").empty()
	game = new Game(subcObj, phraseObj)
	// console.log(game.phrase)

	//create box for each letter
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
	let guessedBox = document.createElement("div")
	guessedBox.classList.add("guessed-box", `guessed-${guess}`)
	guessedBox.innerText = guess

	if (game.phraseContent.includes(guess)) {
		console.log("sweet")
		for (let div of $("div.letter-box")) {
			if (div.innerText === guess) {
				div.style.color = "green"				
			}
		}

		guessedBox.style.color = "green"
		$("div#guessed-container").append(guessedBox)
	} else {
		game.addStrike()

		guessedBox.style.color = "red"
		$("div#guessed-container").append(guessedBox)
	}
}

function gameOver() {
	console.log("Hang me, oh hang me")
}









