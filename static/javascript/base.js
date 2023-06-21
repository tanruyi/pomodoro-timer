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
			attribute:
				'<a href="https://www.freepik.com/free-photo/dried-flower-window-shadow-floral-image_11460360.htm#query=aesthetic%20background&position=49&from_view=search&track=robertav1_2_sidr">Image by rawpixel.com</a> on Freepik',
		},
		{
			name: "rainbow-sky",
			fileLocation: "/static/assets/rainbow-sky.jpg",
			attribute:
				'<a href="https://www.freepik.com/free-vector/aesthetic-pastel-pink-background-rainbow-sky-with-glitter-design-vector_20346136.htm#page=3&query=aesthetic%20background&position=21&from_view=search&track=robertav1_2_sidr">Image by rawpixel.com</a> on Freepik',
		},
		{
			name: "snowy-rooftops",
			fileLocation: "/static/assets/snowy-rooftops.jpg",
			attribute:
				'Photo by <a href="https://unsplash.com/@5tep5?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Aleksandr Popov</a> on <a href="https://unsplash.com/wallpapers/cool/aesthetic?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
		},
		{
			name: "snowy-streets",
			fileLocation: "/static/assets/snowy-streets.jpg",
			attribute: "https://www.artstation.com/artwork/D5Vlxo",
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
		let imgIndex = backgroundData.findIndex((element) => element.name === imgName);
		bgImage.src = backgroundData[imgIndex].fileLocation;
	}

	function saveTask() {
		console.log(taskName.value);
	}

	function clearTask() {
		taskName.value = null;
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
		changeCountdown();
	});

	breakDurationInput.addEventListener("change", function () {
		timerOptions[1].duration = breakDurationInput.value;
		changeCountdown();
	});

	rechargeDurationInput.addEventListener("change", function () {
		timerOptions[2].duration = rechargeDurationInput.value;
		changeCountdown();
	});

	creditsButton.addEventListener("click", function () {
		creditsModal.style.display = "block";
	});

	creditsCloseIcon.addEventListener("click", function () {
		creditsModal.style.display = "none";
	});
});
