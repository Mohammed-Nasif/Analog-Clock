const hrsHand = Array.from(document.getElementsByClassName('hrs'));
const minsHand = Array.from(document.getElementsByClassName('mins'));
const secsHand = Array.from(document.getElementsByClassName('secs'));
const secTick = new Audio('assets/sounds/clock-ticking.mp3');
const hrNotify = new Audio('assets/sounds/hour-notify.mp3');
secTick.autoplay = false;

// To Solve The Privacy Issue
let interactionFlag = false;
window.onclick = () => {
	interactionFlag = true;
};


let callTime = 0;
clockDisplay(0, 1); // London
clockDisplay(1, 0); // Cairo
clockDisplay(2, 6); // Newyork
callTime = 1000;

function clockDisplay(regionIndex, timeDiff) {
	setInterval(() => {
		// To Solve The Privacy Issue
		if(interactionFlag) secTick.play();
		
		secTick.volume = 0.7;
		let date = new Date();
		let secsDeg = date.getSeconds() * 6;
		let minsDeg = date.getMinutes() * 6;
		let hrsDeg = (date.getHours() - timeDiff) * 30;
		let prevhr = hrsDeg;
		if (prevhr === hrsDeg - 1) {
			secTick.volume = 0.1;
			hrNotify.play();
		}
		secsHand[regionIndex].style.rotate = `${secsDeg}deg`;
		minsHand[regionIndex].style.rotate = `${minsDeg}deg`;
		hrsHand[regionIndex].style.rotate = `${hrsDeg}deg`;
	}, callTime);
}

// Dark-Light Mode
const toggleBtn = document.getElementById('toggleMode');
const clickSound = new Audio('assets/sounds/clickAudio.mp3');
toggleBtn.onclick = () => {
	// Get The Current Active Color
	clickSound.play();
	let currClr = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue('--clock-clr')
		.trim();

	if (currClr === 'white') {
		document.documentElement.style.setProperty('--clock-clr', '#282828');
		document.documentElement.style.setProperty(
			'--clock-url',
			"url('../assets/imgs/clock_light.png')",
		);
	} else {
		document.documentElement.style.setProperty('--clock-clr', 'white');
		document.documentElement.style.setProperty(
			'--clock-url',
			"url('../assets/imgs/clock_dark.png')",
		);
	}
};
