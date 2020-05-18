$("div#login")[0].addEventListener("click", loginPopup)
$("input#login-button")[0].addEventListener("click", logIn)

function loginPopup() {
	// console.log("klork")
	$("div#login-popup").removeClass("hidden")

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
			console.log(object)
		})
		.catch(function(error) {
			console.log(error.message)
		})

}



