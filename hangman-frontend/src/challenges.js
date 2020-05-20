function createChallengePopup() {
	$("#challenge-popup-outer").removeClass("hidden")
	$("#sent-challenges-button")[0].addEventListener("click", function() {
		showChallenges("sent")
	})
	$("#received-challenges-button")[0].addEventListener("click", function() {
		showChallenges("received")
	})
	// let challengePopup = document.createElement("div");
	// challengePopup.id = "challenge-popup"
	// $("#user-info").append(challengePopup);

	// let challengePopupHeader = document.createElement("div");
	// challengePopupHeader.id = "challenge-popup-header"
	// challengePopupHeader.innerText = "CHALLENGES"
	// $("#challenge-popup").append(challengePopupHeader)


	// let createChallengeButton = document.createElement("div");
	// createChallengeButton.id = "create-challenge-button";
	// createChallengeButton.innerText = "Create Challenge";
	// $("#challenge-popup").append(createChallengeButton);

	$("#create-challenge-button")[0].addEventListener("click", showChallengeForm)
}

function showChallenges(challengeType) {
	if (challengeType === "received") {
		$("#challenges-container").empty();
		for (challenge of user.receivedChallengesObjArr) {
			// console.log(challenge)
			let challengeDiv = document.createElement("div");
			challengeDiv.id = `challenge-${challenge.id}`;
			if (challenge.solved === false) {
				challengeDiv.style.backgroundColor = "yellow"
			}


			challengeDiv.innerText = challenge.hint;
			$("#challenges-container").append(challengeDiv);

			// let challenge
		}
	}
}

function showChallengeForm() {
	// $("#challenges-form-container").removeClass("hidden")
	// console.log("creating challenge form")
	$("#challenge-popup-inner").empty();
	$("#challenge-popup-inner").html('\
		<div id="challenge-form-container">\
				<label for="challenge-recipient">Recipient: </label>\
				<input type="text" id="challenge-recipient-input" name="recipient"> <br>\
				<label for="challenge-phrase">Phrase: </label>\
				<input type="text" id="challenge-phrase-input" name="phrase"> <br>\
				<label for="challenge-hint">Hint: </label>\
				<input type="text" id="challenge-hint-input" name="hint"> <br>\
				<button id="submit-challenge-button">submit challenge</button>\
		</div>\
		')

	$("#submit-challenge-button")[0].addEventListener("click", submitChallenge)
}

function submitChallenge() {
	// console.log("wwwwweird")

	let configObj = {
		method: "POST",
		headers: {
			"Content_Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			challenge: {
				recipient_name: $("#challenge-recipient-input").val(),
				phrase: $("#challenge-phrase-input").val(),
				hint: $("#challenge-hint-input").val(),
				user_id: user.id 			
			}
		})
	}

	fetch("http://localhost:3000/challenges", configObj)
		.then(resp => resp.json())
		.then(function(object) {
			console.log(object);
			updateChallenges()
		})
		.catch(function(error) {
			console.log(error.message)
		})
}
 
function updateChallenges() {
	console.log("updating challenges")
	fetch(`http://localhost:3000/users/${user.id}`)
		.then(resp => resp.json())
		.then(function(object) {
			console.log(object)
		})
}




