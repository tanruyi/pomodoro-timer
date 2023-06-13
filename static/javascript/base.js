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

	function changeTimerButtonsStyling(type) {
		if (type === "add") {
			if (activeTimerOptionIndex === 0) {
				focusButton.classList.add("timer-buttons-active");
			} else if (activeTimerOptionIndex === 1) {
				breakButton.classList.add("timer-buttons-active");
			} else {
				rechargeButton.classList.add("timer-buttons-active");
			}
		} else if (type === "remove") {
			if (activeTimerOptionIndex === 0) {
				focusButton.classList.remove("timer-buttons-active");
			} else if (activeTimerOptionIndex === 1) {
				breakButton.classList.remove("timer-buttons-active");
			} else {
				rechargeButton.classList.remove("timer-buttons-active");
			}
		}
	}

	function changeTimer(option) {
		// remove active button styling for current timer option
		changeTimerButtonsStyling("remove");

		// find index of chosen option in array timerOptions
		activeTimerOptionIndex = timerOptions.findIndex((element) => element.name === option);

		// add active button styling for chosen timer option
		changeTimerButtonsStyling("add");

		// change countdown
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
