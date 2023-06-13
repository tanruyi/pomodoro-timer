/** @format */

"use strict";

window.addEventListener("load", function () {
	/*=====================================
	// DATA
    =====================================*/

	// duration is in minutes
	let timerOptions = [
		{
			name: "focus",
			duration: 25,
		},
		{
			name: "break",
			duration: 5,
		},
		{
			name: "recharge",
			duration: 30,
		},
	];

	let activeTimerOptionIndex = 0;

	let timerInterval;
	let timer = timerOptions[activeTimerOptionIndex].duration * 60;

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
		// change the countdown displayed in HTML
		let durationMin = timerOptions[activeTimerOptionIndex].duration;
		countdown.innerText = durationMin < 10 ? "0" + durationMin + ":00" : durationMin + ":00";

		// change the timer for javascript countdown
		timer = timerOptions[activeTimerOptionIndex].duration * 60;
	}

	function changePlayPauseButtonText(action) {
		playPauseButton.innerText = action;
		if (action === "pause") {
			startCountdown();
		} else {
			stopCountdown();
		}
	}

	function startCountdown() {
		timerInterval = setInterval(function () {
			timer--;

			let minutes = parseInt(timer / 60, 10);
			let seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			countdown.innerText = minutes + ":" + seconds;

			if (timer == 0) {
				stopCountdown();
			}
		}, 1000);
	}

	function stopCountdown() {
		clearInterval(timerInterval);
	}

	/*=====================================
	// EVENT LISTENERS
    =====================================*/
	focusButton.addEventListener("click", function () {
		changeTimer("focus");
		changePlayPauseButtonText("start");
	});

	breakButton.addEventListener("click", function () {
		changeTimer("break");
		changePlayPauseButtonText("start");
	});

	rechargeButton.addEventListener("click", function () {
		changeTimer("recharge");
		changePlayPauseButtonText("start");
	});

	playPauseButton.addEventListener("click", function (e) {
		if (e.target.innerText === "start") {
			changePlayPauseButtonText("pause");
		} else {
			changePlayPauseButtonText("start");
		}
	});

	resetButton.addEventListener("click", function () {
		changePlayPauseButtonText("start");
		changeCountdown();
	});
});
