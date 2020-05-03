const greetingContainer = document.querySelector(".js-greeting");
const greetingForm = greetingContainer.querySelector("form");
const greetingInput = greetingForm.querySelector("input");
const greetingText = document.querySelector(".js-greetingText");
const SHOWING = "showing";
const USER = "username";

function saveName(text) {
  localStorage.setItem(USER, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentUser = greetingInput.value;
  showGreeting(currentUser);
  saveName(currentUser);
}

function askForName() {
  greetingForm.classList.add(SHOWING);
  greetingForm.addEventListener("submit", handleSubmit);
}

function showGreeting(text) {
  greetingForm.classList.remove(SHOWING);
  greetingText.classList.add(SHOWING);
  greetingText.innerText = `Hello, ${text}`;
}

function loadName() {
  const username = localStorage.getItem(USER);
  if (username !== null) {
    showGreeting(username);
  } else {
    askForName();
  }
}

function init() {
  loadName();
}

init();
