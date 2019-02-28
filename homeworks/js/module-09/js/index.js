"use strict";
const time = document.querySelector(".js-time");
const btnStart = document.querySelector(".js-start");
const btnReset = document.querySelector(".js-reset");
const btnLap = document.querySelector(".js-take-lap");
const lapList = document.querySelector(".js-laps");

btnReset.setAttribute("disabled", true);
btnLap.setAttribute("disabled", true);

const timer = {
  startTime: null,
  currentTime: null,
  deltaTime: null,
  id: 0,
  startIsActive: false,
  pauseTime: null,

  startTimer() {
    if (this.startIsActive) {
      this.startIsActive = false;
      changeBtnName(this.startIsActive);
      this.pauseTime = this.currentTime;
      clearInterval(this.id);
      return;
    }

    this.startTime = Date.now();
    this.id = setInterval(() => {
      this.currentTime = Date.now();
      this.deltaTime = this.currentTime - this.startTime;
      showTime(formatTime(this.deltaTime));
    }, 100);
    this.startIsActive = true;
    changeBtnName(this.startIsActive);
    btnsActivation(this.startIsActive);
  },

  stopTimer() {
    clearInterval(this.id);
    this.deltaTime = 0;
    this.startIsActive = false;
    showTime(formatTime(this.deltaTime));
    changeBtnName(this.startIsActive, this.deltaTime);
    btnsActivation(this.startIsActive);
    deleteLaps();
  },

  takeLap() {
    createLapLi(formatTime(this.deltaTime));
  }
};

btnStart.addEventListener("click", timer.startTimer.bind(timer));
btnReset.addEventListener("click", timer.stopTimer.bind(timer));
btnLap.addEventListener("click", timer.takeLap.bind(timer));


function formatTime(deltaTime) {
  let time = new Date(deltaTime);
  let minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  let seconds =
    time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
  let milliseconds = Math.floor(time.getMilliseconds() / 100);
  return `${minutes}:${seconds}.${milliseconds}`;
}

function showTime(string) {
  time.textContent = string;
}

function changeBtnName(active, deltaTime) {
  if (active) {
    btnStart.textContent = "Pause";
  } else {
    btnStart.textContent = "Continue";
  }
  if (deltaTime === 0) {
    btnStart.textContent = "Start";
  }
}

function createLapLi(lapTime) {
  let lap = document.createElement("li");
  lapList.append(lap);
  lap.textContent = lapTime;
}

function btnsActivation(active) {
  if (active) {
    btnReset.removeAttribute("disabled");
    btnLap.removeAttribute("disabled");
  } else {
    btnReset.setAttribute("disabled", true);
    btnLap.setAttribute("disabled", true);
  }
}

function deleteLaps() {
  let laps = document.querySelectorAll("li");
  laps.forEach(el => el.remove());
}
