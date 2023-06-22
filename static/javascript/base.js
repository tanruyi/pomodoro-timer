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

	let backgroundData = [
		{
			name: "dried-flowers",
			fileLocation: "/static/assets/dried-flowers.jpg",
		},
		{
			name: "rainbow-sky",
			fileLocation: "/static/assets/rainbow-sky.jpg",
		},
		{
			name: "snowy-rooftops",
			fileLocation: "/static/assets/snowy-rooftops.jpg",
		},
		{
			name: "snowy-streets",
			fileLocation: "/static/assets/snowy-streets.jpg",
		},
	];

	let settingCategories = ["theme", "task", "timers"];

	let activeTimerOptionIndex = 0;

	let timerInterval;
	let timer = timerOptions[activeTimerOptionIndex].duration * 60;

	const alarm = new Audio("/static/assets/bell-congratulations-epic-stock-media-1-00-01.mp3");

	let progress = 0;

	const messages = ["Give yourself a pat on the back! You have earned a star! ⭐", "You completed 4 focus sessions! Congratulations! 🎉"];

	let currentSettingCategoryIndex = 0;

	let imgIndex = 0;

	/*=====================================
	// DOM ELEMENTS
    =====================================*/

	// background image
	const bgImage = document.getElementById("page-background-image");

	// menu bar
	const creditsButton = document.getElementById("credits-button");
	const settingsButton = document.getElementById("settings-button");
	const aboutButton = document.getElementById("about-button");

	// timer section
	const currentTaskSection = document.getElementById("current-task-section");
	const currentTask = document.getElementById("current-task");
	const stars = document.querySelectorAll(".fa-star");
	const countdown = document.getElementById("timer-countdown");
	const focusButton = document.getElementById("focus-button");
	const breakButton = document.getElementById("break-button");
	const rechargeButton = document.getElementById("recharge-button");
	const playPauseButton = document.getElementById("start-pause-button");
	const resetButton = document.getElementById("reset-button");

	// message popup
	const messagePopup = document.getElementById("message-popup");
	const messageCloseIcon = document.getElementById("message-close");
	const messageText = document.getElementById("message");

	// about modal
	const aboutModal = document.getElementById("about-modal");
	const aboutCloseIcon = document.getElementById("about-close");

	// settings modal
	const settingsModal = document.getElementById("settings-modal");
	const settingsCloseIcon = document.getElementById("settings-close");
	const themeButton = document.getElementById("settings-theme-button");
	const taskButton = document.getElementById("settings-task-button");
	const timersButton = document.getElementById("settings-timers-button");
	const themeSection = document.getElementById("settings-right-div-theme");
	const taskSection = document.getElementById("settings-right-div-task");
	const timersSection = document.getElementById("settings-right-div-timers");
	const bgImageSelect = document.getElementById("background-img-select");
	const taskName = document.getElementById("task-name");
	const saveTaskButton = document.getElementById("save-task-button");
	const clearTaskButton = document.getElementById("clear-task-button");
	const focusDurationInput = document.getElementById("focus-duration");
	const breakDurationInput = document.getElementById("break-duration");
	const rechargeDurationInput = document.getElementById("recharge-duration");

	// credits modal
	const creditsModal = document.getElementById("credits-modal");
	const creditsCloseIcon = document.getElementById("credits-close");

	/*=====================================
	// COOKIES
    =====================================*/
	function setCookie(cookieName, cookieValue) {
		// set expiry date 30 days from creation
		let expiryDate = new Date();
		expiryDate.setTime(expiryDate.getTime() + 30 * 24 * 60 * 60 * 1000);
		const expires = "expires=" + expiryDate.toUTCString();

		// create cookie
		document.cookie = cookieName + "=" + cookieValue + ";" + expires + "; path=/";
	}

	function getCookie(cookieName) {
		const nameToSearch = cookieName + "=";
		const decodedCookies = decodeURIComponent(document.cookie);
		const cookiesArray = decodedCookies.split(";");

		let result;

		// iterate through each key-value pair in cookiesArray & search for the pair that starts with target name
		// return the value of the pair
		cookiesArray.forEach((element) => {
			// there will be a extra " " in front of each key-value pair from 2nd pair onwards
			while (element.charAt(0) == " ") {
				element = element.substring(1);
			}

			if (element.indexOf(nameToSearch) === 0) {
				result = element.substring(nameToSearch.length);
			}
		});

		// result will be null if no match is found
		return result;
	}

	function checkCookie(cookieName) {
		let cookieValue = getCookie(cookieName);

		if (cookieValue != null) {
			if (cookieName === "imgIndex") {
				imgIndex = cookieValue;
			} else if (cookieName === "focusDuration") {
				timerOptions[0].duration = cookieValue;
			} else if (cookieName === "breakDuration") {
				timerOptions[1].duration = cookieValue;
			} else if (cookieName === "rechargeDuration") {
				timerOptions[2].duration = cookieValue;
			}
		}
	}

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

				// reset timer button & timer duration
				changePlayPauseButtonText("start");
				changeCountdown();

				// add progress stars only if user finished focus timer
				if (activeTimerOptionIndex === 0) {
					progress += 1;
					updateStars("add");
				}

				// update message modal & show
				updateMessageInModal();
				messagePopup.style.display = "block";
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

	function updateMessageInModal() {
		if (progress === 4) {
			messageText.innerText = messages[1];
		} else {
			messageText.innerText = messages[0];
		}
	}

	function changeSettingsCategoryToDisplay(category) {
		if (currentSettingCategoryIndex === 0) {
			themeSection.style.display = "none";
			themeButton.classList.remove("settings-category-button-active");
		} else if (currentSettingCategoryIndex === 1) {
			taskSection.style.display = "none";
			taskButton.classList.remove("settings-category-button-active");
		} else if (currentSettingCategoryIndex === 2) {
			timersSection.style.display = "none";
			timersButton.classList.remove("settings-category-button-active");
		}

		currentSettingCategoryIndex = settingCategories.findIndex((element) => element === category);

		if (currentSettingCategoryIndex === 0) {
			themeSection.style.display = "block";
			themeButton.classList.add("settings-category-button-active");
		} else if (currentSettingCategoryIndex === 1) {
			taskSection.style.display = "block";
			taskButton.classList.add("settings-category-button-active");
		} else if (currentSettingCategoryIndex === 2) {
			timersSection.style.display = "block";
			timersButton.classList.add("settings-category-button-active");
		}
	}

	function changeBackgroundImage(imgName) {
		imgIndex = backgroundData.findIndex((element) => element.name === imgName);
		bgImage.src = backgroundData[imgIndex].fileLocation;
		setCookie("imgIndex", imgIndex);
	}

	function saveTask() {
		currentTask.innerText = "working on: " + taskName.value;
		currentTaskSection.style.display = "block";
	}

	function clearTask() {
		taskName.value = null;
		currentTask.innerText = taskName.value;
		currentTaskSection.style.display = "none";
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

	aboutButton.addEventListener("click", function () {
		aboutModal.style.display = "block";
	});

	aboutCloseIcon.addEventListener("click", function () {
		aboutModal.style.display = "none";
	});

	settingsButton.addEventListener("click", function () {
		settingsModal.style.display = "block";
	});

	settingsCloseIcon.addEventListener("click", function () {
		settingsModal.style.display = "none";
	});

	themeButton.addEventListener("click", function () {
		changeSettingsCategoryToDisplay("theme");
	});

	taskButton.addEventListener("click", function () {
		changeSettingsCategoryToDisplay("task");
	});

	timersButton.addEventListener("click", function () {
		changeSettingsCategoryToDisplay("timers");
	});

	bgImageSelect.addEventListener("change", function () {
		changeBackgroundImage(bgImageSelect.value);
	});
	saveTaskButton.addEventListener("click", function () {
		saveTask();
	});

	clearTaskButton.addEventListener("click", function () {
		clearTask();
	});

	focusDurationInput.addEventListener("change", function () {
		timerOptions[0].duration = focusDurationInput.value;
		setCookie("focusDuration", timerOptions[0].duration);
		changeCountdown();
	});

	breakDurationInput.addEventListener("change", function () {
		timerOptions[1].duration = breakDurationInput.value;
		setCookie("breakDuration", timerOptions[1].duration);
		changeCountdown();
	});

	rechargeDurationInput.addEventListener("change", function () {
		timerOptions[2].duration = rechargeDurationInput.value;
		setCookie("rechargeDuration", timerOptions[2].duration);
		changeCountdown();
	});

	creditsButton.addEventListener("click", function () {
		creditsModal.style.display = "block";
	});

	creditsCloseIcon.addEventListener("click", function () {
		creditsModal.style.display = "none";
	});

	/*=====================================
	// FUNCTIONS TO RUN ON LOAD
    =====================================*/
	// change bg image based on cookie
	checkCookie("imgIndex");
	changeBackgroundImage(backgroundData[imgIndex].name);

	// change timer durations based on cookie
	checkCookie("focusDuration");
	checkCookie("breakDuration");
	checkCookie("rechargeDuration");
	changeCountdown();
});
