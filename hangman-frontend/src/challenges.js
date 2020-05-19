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

}