const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoListPen = document.querySelector(".pending"),
  toDoListFin = document.querySelector(".finished");

const TODOS_PEN = "toDosPending";
const TODOS_FIN = "toDosFisnished";

let toDosPen = [];
let toDosFin = [];

function saveToDos(LIST, list) {
  localStorage.setItem(LIST, JSON.stringify(list));
}

function moveToDos(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  const span = li.children[2];
  const text = span.innerText;
  if (ul === toDoListPen) {
    showToDoFin(text);
  } else {
    showToDoPen(text);
  }
  delToDos(event);
}

function delToDos(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  if (ul === toDoListPen) {
    toDoListPen.removeChild(li);
    const cleanedToDosPen = toDosPen.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDosPen = cleanedToDosPen;
    saveToDos(TODOS_PEN, toDosPen);
  } else {
    toDoListFin.removeChild(li);
    const cleanedToDosFin = toDosFin.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDosFin = cleanedToDosFin;
    saveToDos(TODOS_FIN, toDosFin);
  }
}

function showToDoFin(text) {
  const finId = toDosFin.length + 1;
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btnDel = document.createElement("button");
  btnDel.addEventListener("click", delToDos);
  const btnPen = document.createElement("button");
  btnPen.addEventListener("click", moveToDos);
  span.innerText = text;
  btnDel.innerText = "×";
  btnPen.innerText = "◂◂";
  li.appendChild(btnDel);
  li.appendChild(btnPen);
  li.appendChild(span);
  toDoListFin.appendChild(li);
  li.id = finId;
  const toDoFinObj = {
    text: text,
    id: finId,
  };
  toDosFin.push(toDoFinObj);
  saveToDos(TODOS_FIN, toDosFin);
}

function showToDoPen(text) {
  const penId = toDosPen.length + 1;
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btnDel = document.createElement("button");
  btnDel.addEventListener("click", delToDos);
  const btnFin = document.createElement("button");
  btnFin.addEventListener("click", moveToDos);
  span.innerText = text;
  btnDel.innerText = "×";
  btnFin.innerText = "∨";
  li.appendChild(btnDel);
  li.appendChild(btnFin);
  li.appendChild(span);
  toDoListPen.appendChild(li);
  li.id = penId;
  const toDoPenObj = {
    text: text,
    id: penId,
  };
  toDosPen.push(toDoPenObj);
  saveToDos(TODOS_PEN, toDosPen);
}

function handleSubmit(event) {
  event.preventDefault();
  ("");
  const currentValue = toDoInput.value;
  showToDoPen(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedPending = localStorage.getItem(TODOS_PEN),
    loadedFinished = localStorage.getItem(TODOS_FIN);
  const parsedPen = JSON.parse(loadedPending),
    parsedFin = JSON.parse(loadedFinished);
  if (loadedPending || loadedFinished) {
    parsedPen.forEach(function (toDoPen) {
      showToDoPen(toDoPen.text);
    });
    parsedFin.forEach(function (toDoFin) {
      showToDoFin(toDoFin.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
