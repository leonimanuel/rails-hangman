//On DOM CONTENT LOAD?
// console.log("yup")
(function getCategories() {
	fetch("http://localhost:3000/categories")
		.then(resp => resp.json())
		.then(function(object) {
			for (c of object) {
				let div = document.createElement("div");
				div.id = `${c.name.toLowerCase()}-category`
				div.className = "category"
				div.innerText = c.name;

				div.addEventListener("click", showSub)

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

function showSub(e) {
	console.log(e.target.id)
}