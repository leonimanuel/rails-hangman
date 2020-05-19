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
		<div id="challenge-form">\
			<label for="challenge-phrase">Phrase: </label>\
			<input type="text" id="challenge-phrase" name="phrase"> <br>\
			<label for="challenge-hint">Hint: </label>\
			<input type="text" id="challenge-hint" name="hint"> <br>\
			<button id="submit-challenge-button">submit challenge</button>\
		</div>\
		')
}