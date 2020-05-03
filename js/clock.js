const header = document.querySelector("header");
const clock = header.querySelector(".js-clock");

function showTime(hours, minutes, seconds) {
  clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  showTime(hours, minutes, seconds);
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
