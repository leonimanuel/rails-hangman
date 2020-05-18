//On DOM CONTENT LOAD?
// console.log("yup")
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
			let randomPhrase = subcObj.phrases[Math.floor(Math.random() * subcObj.phrases.length)].content
			startGame(subcObj, randomPhrase)
			// console.log(randomPhraseObj.content)
		})
}

function startGame(subc, phrase) {
	// console.log("starting game")
	let game = new Game(subc, phrase)

	let div = document.createElement("div")
	div.innerText = game.phrase
	div.id = "phrase"
	$("div#board").append(div)
}

class Game {
	constructor(subcategory, phrase) {
		// this.category = category;
		this.subcategory = subcategory;
		this.phrase = phrase
		// this.turns = turns;
		// this.result = result;
	}
}











