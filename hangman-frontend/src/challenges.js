$("#received-challenges-button")[0].addEventListener("click", function() {
	showChallenges("received")
})

$("#sent-challenges-button")[0].addEventListener("click", function() {
	showChallenges("sent")
})

$("#create-challenge-button")[0].addEventListener("click", showChallengeForm)

$("#challenges-close-button")[0].addEventListener("click", function() {
	$("#challenge-popup-outer").addClass("hidden")
})

function createChallengePopup() {
	console.log("Executing createChallengePopup")
	$("#challenge-popup-outer").removeClass("hidden")
}

function showChallenges(challengeType) {
	console.log("executing showChallenges")
	$("#challenges-container").empty();
	if (challengeType === "received") {
		for (let challenge of user.receivedChallengesObjArr) {
			// console.log(challenge)
			let challengeDiv = document.createElement("div");
			challengeDiv.id = `challenge-${challenge.id}`;
			challengeDiv.classList.add("challenge-box");

			challengeDiv.innerHTML = `
				<div class="challenge-details-container">
					<div class="challenge-detail">${challenge.user.name}</div>
					<div class="challenge-detail">${challenge.hint}</div>
				</div>
				`;

			$("#challenges-container").append(challengeDiv);

			if (challenge.solved === false) {
				console.log(`CHALLENGE "${challenge.content}" IS NOT SOLVED`)
				let play = document.createElement("div");
				play.id = `play-${challenge.id}`
				play.className = "challenge-status"
				play.innerText = "PLAY";
				$(`#challenge-${challenge.id}`).append(play)
				
				$(`#play-${challenge.id}`)[0].addEventListener("click", function() {
					$("#challenge-popup-outer").addClass("hidden")
					// console.log(challenge.id)
					startGame(challenge)
				})
			} else if (challenge.solved === true && challenge.result === "WIN") {				
				// challengeDiv.style.backgroundColor = "green"
					console.log(`CHALLENGE "${challenge.content}" IS WON`)
					let won = document.createElement("div");
					won.className = "challenge-status"
					won.innerText = "WON";
					$(`#challenge-${challenge.id}`).append(won)
			} else if (challenge.solved === true && challenge.result === "LOSE") {				
					console.log(`CHALLENGE "${challenge.content}" IS LOST`)
					let lost = document.createElement("div");
					lost.className = "challenge-status"
					lost.innerText = "LOST";
					$(`#challenge-${challenge.id}`).append(lost)
			} 
		}
	} else if (challengeType === "sent") {
			$("#challenges-container").empty();
			for (challenge of user.sentChallengesObjArr) {
				// console.log(challenge)
				let challengeDiv = document.createElement("div");
				challengeDiv.id = `challenge-${challenge.id}`;
				challengeDiv.classList.add("challenge-box");

				if (challenge.solved === false) {
					// challengeDiv.style.backgroundColor = "yellow"
				} else if (challenge.solved === true && challenge.result === "won") {				
					challengeDiv.style.backgroundColor = "green"
				} else if (challenge.solved === true && challenge.result === "lost") {				
					challengeDiv.style.backgroundColor = "red"
				} 

				challengeDiv.innerHTML = `
					<div id="challenge-details-container">
						<div class="challenge-detail">${challenge.hint}</div> <br>
						<div class="challenge-detail">${challenge.recipient.name}</div>
					</div>
					`;
				$("#challenges-container").append(challengeDiv);
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

function updateUserChallenges(result) {
	let configObj = {
		method: "PATCH",
		headers: {
			"Content_Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			solved: true,
			result: result
		})
	}

	fetch(`http://localhost:3000/challenges/${game.phraseId}`, configObj)
		.then(resp => resp.json())
		.then(function(userObj) {
			user.receivedChallengesObjArr = userObj.received_challenges
			user.sentChallengesObjArr = userObj.sent_challenges
			console.log(`UPDATED USER CHALLENGES`)
		})
		.catch(function(err) {
			console.log(err.message)
		})

	setTimeout(function() {
		createChallengePopup()
	}, 1500)
}



