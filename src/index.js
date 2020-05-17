//On DOM CONTENT LOAD?
// console.log("yup")
(function getCategories() {
	fetch("http://localhost:3000/categories")
		.then(resp => resp.json())
		.then(function(object) {
			for (c of object) {
				let div = document.createElement("div");
				div.innerText = c.name;
				$("div#categories").append(div)
				// let categories = document.getElementById("categories")
				// let div = document.createElement("div");
				// div.innerText = c.name;
				// categories.appendChild(div)
				// console.log(c.name)
			}
		})
		.catch(function(error) {
			alert("failed bruh")
		})
})()