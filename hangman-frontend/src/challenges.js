function createChallengePopup() {
	console.log("Executing createChallengePopup")
	$("#challenges-container").empty();
	// $("#challenge-popup-outer").removeClass("hidden")
	let challengePopup = document.createElement("div");
	document.body.append(challengePopup)
	challengePopup.innerHTML = `
	<div id="challenge-popup-outer">
		<span id="challenges-close-button" class="close-button">X</span>
		<h3 id="challenge-popup-header">CHALLENGES</h3>
		<div id="challenge-popup-inner">
			<button id="received-challenges-button">Received Challenges</button>
			<button id="sent-challenges-button">Sent Challenges</button>
			<div id="challenges-container">
				CHALLENGES GO HERE
			</div>
			<br>
			<button id="create-challenge-button">Create Challenge</button>
		</div>			
	</div> `

	$("#received-challenges-button")[0].addEventListener("click", () => showChallenges("received") )
	$("#sent-challenges-button")[0].addEventListener("click", () => showChallenges("sent") )
	$("#create-challenge-button")[0].addEventListener("click", showChallengeForm)
	$("#challenges-close-button")[0].addEventListener( "click", () => $("#challenge-popup-outer").remove() );
}

function showChallenges(challengeType) {
	console.log("executing showChallenges")
	$("#challenges-container").empty();

	if (challengeType === "received") {
		for (let challenge of user.receivedChallengesObjArr) {
			console.log(`content: ${challenge.content}, solved: ${challenge.solved}, result: ${challenge.result}`)
			let challengeDiv = document.createElement("div");
			challengeDiv.id = `challenge-${challenge.id}`;
			challengeDiv.classList.add("challenge-box");
			$("#challenges-container").append(challengeDiv);


			challengeDiv.innerHTML = `
				<div class="challenge-details-container">
					<div class="challenge-detail">${challenge.user.name}</div>
					<div class="challenge-detail">${challenge.hint}</div>
				</div>
				`;

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
				let challengeDiv = document.createElement("div");
				challengeDiv.id = `challenge-${challenge.id}`;
				challengeDiv.classList.add("challenge-box");
				$("#challenges-container").append(challengeDiv);

				challengeDiv.innerHTML = `
					<div class="challenge-details-container">
						<div class="challenge-detail">${challenge.recipient.name}</div>
						<div class="challenge-detail">${challenge.content}</div>
					</div>
				`;

				if (challenge.solved === false) {
					let pend = document.createElement("div");
					pend.className = "challenge-status"
					pend.innerText = "PENDING";
					$(`#challenge-${challenge.id}`).append(pend)
				} else if (challenge.solved === true && challenge.result === "WIN") {				
					// challengeDiv.style.backgroundColor = "green"
						let won = document.createElement("div");
						won.className = "challenge-status"
						won.innerText = "WON";
						$(`#challenge-${challenge.id}`).append(won)
				} else if (challenge.solved === true && challenge.result === "LOSE") {				
						let lost = document.createElement("div");
						lost.className = "challenge-status"
						lost.innerText = "LOST";
						$(`#challenge-${challenge.id}`).append(lost)
				} 
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
				<input type="text" id="challenge-phrase-input" maxLength="100" name="phrase"> <br>\
				<label for="challenge-hint">Hint: </label>\
				<input type="text" id="challenge-hint-input" maxLength="100" name="hint"> <br>\
				<button id="submit-challenge-button">submit challenge</button>\
		</div>\
		')

	$("#submit-challenge-button")[0].addEventListener("click", submitChallenge)
}

function submitChallenge() {
	if (validChallenge()) {
		console.log("submitting challenge")
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
			.then(function(challengeObj) {
				console.log(challengeObj);

				if (challengeObj.errors) {
					console.log(challengeObj.errors)
					showUsernameError(challengeObj.errors)
				}
				updateChallenges()
			})
			.catch(function(error) {
				alert(error.message)
			})		
	}
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



