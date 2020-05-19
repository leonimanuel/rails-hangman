$("#hint-header")[0].addEventListener("click", function() {
	console.log("executing hint-reveal")
	let hint = game.hint
	$("#hint-box").append(hint)
})

