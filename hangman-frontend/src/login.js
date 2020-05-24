$("div#login")[0].addEventListener("click", function() {
	$("#name-field").addClass("hidden")
	openLogin()
} )
$("div#signup")[0].addEventListener("click", function() {
	// let signupInput = document.createElement("div");
	// signupInput.innerHTML = `Name: <input type="text" id="name-input" value=""> <br>`
	// $("#login-inputs-container").prepend(signupInput)
	$("#name-field").removeClass("hidden")
	openLogin()
} )

$("#login-button")[0].addEventListener("click", logIn)
$("#login-close-button")[0].addEventListener("click", closeLogin)

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
			name: $("#name-input").val(),
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
	user = new User(userObj);
	
	// $("#login").addClass("hidden");
	$("#user-info").empty()
	// userInfo = document.createElement("div");
	// userInfo.id = "user-info";

	let userName = document.createElement("div");
	userName.id = "user-name";
	userName.innerText = user.name
	$("#user-info").append(userName)

	let wins = document.createElement("div");
	wins.id = "wins";
	wins.innerHTML = `wins: <span id="user-wins">${user.wins}</span>`

	let losses = document.createElement("div");
	losses.id = "losses";
	losses.innerHTML = `losses: <span id="user-losses">${user.losses}</span>`

	$("#user-info").append(wins)
	$("#user-info").append(losses)

	let challengesButton = document.createElement("div");
	challengesButton.id = "challenges-button";
	challengesButton.innerText = "challenges"
	$("#user-info").append(challengesButton)
	$("#challenges-button")[0].addEventListener("click", createChallengePopup)

};


