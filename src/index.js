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
					showSub(event, c.subcategories)
				})

				$("div#categories").append(div)
				// let categories = document.getElementById("categories")
				// let div = document.createElement("div");
				// div.innerText = c.name;
				// categories.appendChild(div)
				console.log(c.subcategories)
			}
		})
		.catch(function(error) {
			alert("failed bruh")
		})
})()

function showSub(e, subcArray) {

	$("div#subcategories").empty();
	for (subc of subcArray) {
		let div = document.createElement("div");
		div.id = `${subc.name.toLowerCase()}-subcategory`
		div.className = "subcategory"
		div.innerText = subc.name;

		$("div#subcategories").append(div)	
	}
	// object
	// let div = document.createElement("div");
	// div.id = `${subc.name.toLowerCase()}-subcategory`
	// div.className = "subcategory"
	// div.innerText = subc.name;

	// $("div#subcategories").append(div)

	// console.log(e.target.id)
	// console.log(object)
}




