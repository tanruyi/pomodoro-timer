/** @format */

"use strict";

window.addEventListener("load", function () {
	/*=====================================
	// DATA
    =====================================*/
	let timerOptions = [
		{
			name: "focus",
			duration: "25:00",
		},
		{
			name: "break",
			duration: "05:00",
		},
		{
			name: "recharge",
			duration: "30:00",
		},
	];

	let activeTimerOptionIndex = 0;

	/*=====================================
	// DOM ELEMENTS
    =====================================*/

	const countdown = document.getElementById("timer-countdown");
	const focusButton = document.getElementById("focus-button");
	const breakButton = document.getElementById("break-button");
	const rechargeButton = document.getElementById("recharge-button");
	const playPauseButton = document.getElementById("start-pause-button");
	const resetButton = document.getElementById("reset-button");

	/*=====================================
	// EVENT HANDLERS
    =====================================*/
	function changeTimer(option) {
		// find index of chosen option in array timerOptions
		activeTimerOptionIndex = timerOptions.findIndex((element) => element.name === option);

		changeCountdown();
	}

	function changeCountdown() {
		countdown.innerText = timerOptions[activeTimerOptionIndex].duration;
	}

	function changePlayPauseButtonText(e) {
		if (e.target.innerText === "start") {
			playPauseButton.innerText = "pause";
		} else {
			playPauseButton.innerText = "start";
		}
	}

	/*=====================================
	// EVENT LISTENERS
    =====================================*/
	focusButton.addEventListener("click", function () {
		changeTimer("focus");
	});

	breakButton.addEventListener("click", function () {
		changeTimer("break");
	});

	rechargeButton.addEventListener("click", function () {
		changeTimer("recharge");
	});

	playPauseButton.addEventListener("click", function (e) {
		changePlayPauseButtonText(e);
	});

	resetButton.addEventListener("click", function () {
		changeCountdown();
	});
});
