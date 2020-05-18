$("div#login")[0].addEventListener("click", openLogin)
$("#login-button")[0].addEventListener("click", logIn)
$("#close-button")[0].addEventListener("click", closeLogin)

function openLogin() {
	$("#login-popup").removeClass("hidden")

}

function closeLogin() {
	$("#login-popup").addClass("hidden")

}

function logIn() {
	// console.log($("#email-input").val())

	let configObj = {
		method: "POST",
		headers: {
			"Content_Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			email: $("#email-input").val(),
			password: $("#password-input").val()
		})
	}
	fetch("http://localhost:3000/login", configObj)
		.then(resp => resp.json())
		.then(function(object) {
			if (object.name) {
				console.log(object.name)
			} else {
				console.log(object.message)
			}
		})
		.catch(function(error) {
			console.log(error.messsage)
		})

}



