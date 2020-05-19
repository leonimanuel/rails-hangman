function createChallengePopup() {
	let challengePopup = document.createElement("div");
	challengePopup.id = "challenge-popup"
	$("#user-info").append(challengePopup);

	let challengePopupHeader = document.createElement("div");
	challengePopupHeader.id = "challenge-popup-header"
	challengePopupHeader.innerText = "CHALLENGES"
	$("#challenge-popup").append(challengePopupHeader)


	let createChallengeButton = document.createElement("div");
	createChallengeButton.id = "create-challenge-button";
	createChallengeButton.innerText = "Create Challenge";
	$("#challenge-popup").append(createChallengeButton);

	createChallengeButton.addEventListener("click", createChallengeForm)
}

function createChallengeForm() {
	// console.log("creating challenge form")
	$("#challenge-popup").empty();
	$("#challenge-popup").html('\
		<div id="challenge-form-container">\
			<form id="challenge-form">\
				<label for="challenge-recipient">Recipient: </label>\
				<input type="text" id="challenge-recipient-input" name="recipient"> <br>\
				<label for="challenge-phrase">Phrase: </label>\
				<input type="text" id="challenge-phrase-input" name="phrase"> <br>\
				<label for="challenge-hint">Hint: </label>\
				<input type="text" id="challenge-hint-input" name="hint"> <br>\
				<button id="submit-challenge-button">submit challenge</button>\
			</form>\
		</div>\
		')

	$("#submit-challenge-button")[0].addEventListener("click", submitChallenge())
}

function submitChallenge() {
	let configObj = {
		method: "POST",
		headers: {
			"Content_Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			recipient: $("#challenge-recipient-input").val(),
			phrase: $("#challenge-phrase-input").val(),
			hint: $("#challenge-hint-input").val()
		})
	}

	fetch("http://localhost:3000/challenges", configObj)
		.then(resp => resp.json())
		.then(function(object) {
			console.log(object)
		})
		.catch(function(error) {
			console.log(error.message)
		})
}
 





