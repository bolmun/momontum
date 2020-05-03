const body = document.querySelector("body");

const IMG_NUMBER = 13;
const BG_IMAGE = "background-img";

function showImage(num) {
  const image = new Image();
  image.src = `images/${num}.jpg`;
  image.classList.add(BG_IMAGE);
  body.prepend(image);
}

function getNums() {
  const number = Math.ceil(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNum = getNums();
  showImage(randomNum);
}

init();
