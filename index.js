//On DOM CONTENT LOAD?

function getCategories() {
	fetch("http://localhost:3000/categories")
		.then(resp => resp.json())
		.then(function(object) {
			console.log("success bruh")
		})
		.catch(function(error) {
			alert("failed bruh")
		})
}