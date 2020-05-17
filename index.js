//On DOM CONTENT LOAD?
// console.log("yup")
(function getCategories() {
	fetch("http://localhost:3000/categories")
		.then(resp => resp.json())
		.then(function(object) {
			for (c of object) {
				let categories = document.getElementById("categories")
				let div = document.createElement("div");
				categories.appendChild(div)
				div.innerText = c.name;

				console.log(c.name)
			}
		})
		.catch(function(error) {
			alert("failed bruh")
		})
})()