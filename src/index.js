//On DOM CONTENT LOAD?
// console.log("yup")
let game

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
		letterBox.className = "letter-box"
		letterBox.innerText = letter
		$("div#board").append(letterBox)

	}


	// let div = document.createElement("div")
	// div.innerText = game.phrase
	// div.id = "phrase"
	// $("div#board").append(div)


}

class Game {
	constructor(subcategory, phraseObj) {
		// this.category = category;
		this.subcategory = subcategory.name;
		this.phraseObj = phraseObj
		this.phraseContent = phraseObj.content;
		this.hint = phraseObj.hint
		// this.turns = turns;
		// this.result = result;
	}
}











