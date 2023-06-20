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

	const alarm = new Audio("/static/assets/bell-congratulations-epic-stock-media-1-00-01.mp3");

	let progress = 0;

	/*=====================================
	// DOM ELEMENTS
    =====================================*/

	const countdown = document.getElementById("timer-countdown");
	const focusButton = document.getElementById("focus-button");
	const breakButton = document.getElementById("break-button");
	const rechargeButton = document.getElementById("recharge-button");
	const playPauseButton = document.getElementById("start-pause-button");
	const resetButton = document.getElementById("reset-button");
	const messagePopup = document.getElementById("message-popup");
	const messageCloseIcon = document.getElementById("message-close");
	const creditsButton = document.getElementById("credits-button");
	const creditsModal = document.getElementById("credits-modal");
	const creditsCloseIcon = document.getElementById("credits-close");
	const stars = document.querySelectorAll(".fa-star");

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

			// once timer ends, stop timer, play alarm sound, show message modal, and update progress stars
			if (timer == 0) {
				stopCountdown();
				alarm.play();
				messagePopup.style.display = "block";

				// reset timer button & timer duration
				changePlayPauseButtonText("start");
				changeCountdown();

				// add progress stars only if user finished focus timer
				if (activeTimerOptionIndex === 0) {
					progress += 1;
					updateStars("add");
				}
			}
		}, 1000);
	}

	function stopCountdown() {
		clearInterval(timerInterval);
	}

	function updateStars(type) {
		if (type === "add") {
			for (let i = 0; i < progress; i++) {
				stars[i].classList.remove("fa-regular");
				stars[i].classList.add("fa-solid");
			}
		} else if (type === "reset") {
			for (let i = 0; i < 4; i++) {
				stars[i].classList.remove("fa-solid");
				stars[i].classList.add("fa-regular");
			}
		}
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
			if (progress === 4 && activeTimerOptionIndex === 0) {
				progress = 0;
				updateStars("reset");
			}
			changePlayPauseButtonText("pause");
		} else {
			changePlayPauseButtonText("start");
		}
	});

	resetButton.addEventListener("click", function () {
		changePlayPauseButtonText("start");
		changeCountdown();
	});

	messageCloseIcon.addEventListener("click", function () {
		messagePopup.style.display = "none";
	});

	creditsButton.addEventListener("click", function () {
		creditsModal.style.display = "block";
	});

	creditsCloseIcon.addEventListener("click", function () {
		creditsModal.style.display = "none";
	});
});
