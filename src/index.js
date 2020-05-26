let undoButton = document.body.querySelector('.undo-btn');
let redoButton = document.body.querySelector('.redo-btn');
let restatButton = document.body.querySelector('.restart-btn');
window.onload = function LoadGame(){
  if (window.localStorage.length === 0) {
    window.localStorage.setItem('history', '[]');
    window.localStorage.setItem('position', '-1');
  } else {
    const history = JSON.parse(window.localStorage.getItem('history'));
    const position = parseInt(window.localStorage.getItem('position'));
    for (let i = 0; i <= position; i += 1) {
      document.body.querySelector(`#${history[i]}`).classList.add(i % 2 === 0 ? 'ch' : 'r');
    }
    undoButton.removeAttribute('disabled');
    if (position < (history.length - 1)){
      redoButton.removeAttribute('disabled');
    }
  }  
}

document.querySelector('.field').addEventListener('click', function(event) {
  let position = parseInt(window.localStorage.getItem('position'));
  let history = JSON.parse(window.localStorage.getItem('history'));
  position += 1;
  if (event.target.classList.contains('row') === false){
    event.target.classList.add(GetMove());
    DiagonalRight();
    DiagonalLeft();
    for (let i = 0; i < COLS_COUNT; i += 1) {
      Vertical(i);
      Horizontal(i);
    }
    console.log(history);
    history = history.slice(0, position);
    history.push(event.target.id);
    history = JSON.stringify(history);
    undoButton.removeAttribute('disabled');
    redoButton.setAttribute('disabled', 'disabled');
    window.localStorage.setItem('position', position);
    window.localStorage.setItem('history', history);
  }
});

undoButton.addEventListener('click', function(event){
  let position = parseInt(window.localStorage.getItem('position'));
  const history = JSON.parse(window.localStorage.getItem('history'));
  document.body.querySelector(`#${history[position]}`).classList.remove('ch');
  document.body.querySelector(`#${history[position]}`).classList.remove('r');
  position -= 1;
  if (position === -1) undoButton.setAttribute('disabled', 'disabled')
  redoButton.removeAttribute('disabled');
  window.localStorage.setItem('position', position);
})

redoButton.addEventListener('click', function(event){
  let position = parseInt(window.localStorage.getItem('position')) + 1;
  const history = JSON.parse(window.localStorage.getItem('history'));
  document.body.querySelector(`#${history[position]}`).classList.add(GetMove())
  if (position === (history.length - 1)) redoButton.setAttribute('disabled', 'disabled')
  undoButton.removeAttribute('disabled');
  window.localStorage.setItem('position', position);
})

restatButton.addEventListener('click', function(event){
  localStorage.clear();
  location.reload();
})

function GetMove() {
  let position = parseInt(window.localStorage.getItem('position'));
  if (position % 2 === 1 || position === -1) {
    return('ch');
  } else if (position % 2 === 0) {
    return('r');
  }
}

function DiagonalRight() {
  const firstCell = document.body.querySelector('#c-0');
  let checkCell;
  let winCell;
  for (let i = 0; i < COLS_COUNT; i += 1) {
    checkCell = document.body.querySelector(`#c-${(COLS_COUNT + 1) * i}`);
    if (firstCell.classList.item(1) === null) {
      return false;
    }
    if (firstCell.classList.item(1) !== checkCell.classList.item(1)) {
      return false;
    }
  }
  for (let i = 0; i < COLS_COUNT; i++) {
    winCell = document.body.querySelector(`#c-${(COLS_COUNT + 1) * i}`);
    winCell.classList.add('win', 'diagonal-right');
  }
  document.body.querySelector('.won-title').classList.remove('hidden');
  document.body.querySelector('.won-message').innerHTML = firstCell.classList.contains('r')
    ? 'Toes won!'
    : 'Croses won!';
  return true;
}

function DiagonalLeft() {
  let firstCell = document.body.querySelector(`#c-${COLS_COUNT - 1}`);
  let checkCell;
  for (let i = 1; i <= COLS_COUNT; i++) {
    checkCell = document.body.querySelector(`#c-${(COLS_COUNT - 1) * i}`);
    if (firstCell.classList.item(1) === null) {
      return false;
    }
    if (firstCell.classList.item(1) !== checkCell.classList.item(1)) {
      return false;
    }
  }
  for (let i = 1; i <= COLS_COUNT; i += 1) {
    checkCell = document.body.querySelector(`#c-${(COLS_COUNT - 1) * i}`);
    checkCell.classList.add('win', 'diagonal-left');
  }
  document.body.querySelector(`[class*='won-title']`).classList.remove('hidden');
  document.body.querySelector(`[class*='won-message']`).innerHTML = firstCell.classList.contains('r')
    ? 'Toes won!'
    : 'Croses won!';
  return true;
}

function Vertical(id) {
  let firstCell;
  let checkCell;
  firstCell = document.body.querySelector(`#c-${id}`);
  for (let i = 0; i < COLS_COUNT; i++) {
    checkCell = document.body.querySelector(`#c-${COLS_COUNT * i + id}`);
    if (checkCell.classList.item(1) === null) {
      return false;
    } else if (firstCell.classList.item(1) !== checkCell.classList.item(1)) {
      return false;
    }
  }
  for (let i = 0; i < COLS_COUNT; i++) {
    checkCell = document.body.querySelector(`#c-${COLS_COUNT * i + id}`);
    checkCell.classList.add('win', 'vertical');
  }
  document.body.querySelector(`[class*='won-title']`).classList.remove('hidden');
  document.body.querySelector(`[class*='won-message']`).innerHTML = firstCell.classList.contains('r')
    ? 'Toes won!'
    : 'Croses won!';
  return true;
}

function Horizontal(id) {
  let firstCell;
  let checkCell;
  firstCell = document.body.querySelector(`#c-${id * COLS_COUNT}`);
  for (let i = 0; i < COLS_COUNT; i++) {
    checkCell = document.body.querySelector(`#c-${id * COLS_COUNT + i}`);
    if (firstCell.classList.item(1) === null) return false;
    else if (firstCell.classList.item(1) !== checkCell.classList.item(1)) {
      return false;
    }
  }
  for (let i = 0; i < COLS_COUNT; i++) {
    checkCell = document.body.querySelector(`#c-${id * COLS_COUNT + i}`);
    checkCell.classList.add('win', 'horizontal');
  }
  document.body.querySelector(`[class*='won-title']`).classList.remove('hidden');
  document.body.querySelector(`[class*='won-message']`).innerHTML = firstCell.classList.contains('r')
    ? 'Toes won!'
    : 'Croses won!';
  return true;
}
