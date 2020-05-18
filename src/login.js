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
				loadUser(object)
				closeLogin()
				console.log(object.name);
			} else {
				console.log(object.message)
			}
		})
		.catch(function(error) {
			console.log(error.messsage)
		})
}

function loadUser(userObj) {
	user = new User(userObj.id, userObj.name, userObj.email, userObj.wins, userObj.losses);
	
	$("#login").addClass("hidden");
	// userInfo = document.createElement("div");
	// userInfo.id = "user-info";

	userName = document.createElement("div");
	userName.id = "user-name";
	userName.innerText = user.name
	$("#user-info").append(userName)

	wins = document.createElement("div");
	wins.id = "wins";
	wins.innerText = `wins: ${user.wins}`

	losses = document.createElement("div");
	losses.id = "losses";
	losses.innerText = `losses: ${user.losses}`

	$("#user-info").append(wins)
	$("#user-info").append(losses)
};


