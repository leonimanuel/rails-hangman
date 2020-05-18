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
			startGame(e, c, subc)
		})

		$("div#subcategories").append(div)	
	}
}

function startGame(e, cObj, subcObj) {
	console.log(subcObj.id)
	// fetch(`http://localhost:3000/subcategory/${subc.id}`)
	// game = new Game(cObj.name, subcObj.name, )
	// console.log(category)
	// console.log(subcategory)
}

class Game {
	constructor(category, subcategory, phrase) {
		this.category = category;
		this.subcategory = subcategory;
		this.phrase = phrase
		// this.turns = turns;
		// this.result = result;
	}
}











