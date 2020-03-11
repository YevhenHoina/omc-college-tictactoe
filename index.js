window.localStorage.setItem('arrayOfActions', null);
window.localStorage.setItem('position', '0');

document.body.addEventListener('click', function (event) {
    let position = JSON.parse(window.localStorage.getItem('position'));
    let arrayOfActions = (window.localStorage.getItem('arrayOfActions')).split(','); //suka
    if (event.target.classList.contains('cell')) {
        if (arrayOfActions.length % 2 === 0) {
            event.target.classList.add('ch');
        }
        else if (arrayOfActions.length % 2 === 1) {
            event.target.classList.add('r');
        }
        DiagonalRight();
        DiagonalLeft();
        for (let i = 0; i < COLS_COUNT; i++) {
            (Vertical(i));
            (Horizontal(i));
        }
        console.log(position)
        arrayOfActions.push(event.target.id);
        document.body.querySelector(`[class*='undo-btn btn']`).removeAttribute('disabled');
        arrayOfActions.slice(position, arrayOfActions.length)
        console.log('click before: ', position)
        ++position;
        window.localStorage.setItem('position', position);
        console.log('click after: ', position);
        window.localStorage.setItem('arrayOfActions', arrayOfActions)
    }
})
document.body.querySelector(`[class*='undo-btn btn']`).addEventListener('click', function () {
    let arrayOfActions = (window.localStorage.getItem('arrayOfActions')).split(',');
    let position = JSON.parse(window.localStorage.getItem('position'));
    let victimCell = document.body.querySelector(`#${arrayOfActions[position]}`);
    victimCell.classList.remove('ch', 'r');
    if (position === 0) {
        document.body.querySelector(`[class*='undo-btn btn']`).setAttribute('disabled', 'disabled');
    }
    document.body.querySelector(`[class*='redo-btn btn']`).removeAttribute('disabled');
    --position;
    window.localStorage.setItem('position', position);
    console.log('undo: ', position);
})

function DiagonalRight() {
    let firstCell = document.body.querySelector('#c-0');
    let checkCell;
    for (let i = 0; i < COLS_COUNT; i++) {
        checkCell = document.body.querySelector(`#c-${(COLS_COUNT + 1) * i}`);
        if (firstCell.classList.item(1) === null) {
            return false;
        }
        else if (firstCell.classList.item(1) !== checkCell.classList.item(1)) {
            return false;
        }
    }
    for (let i = 0; i < COLS_COUNT; i++) {
        winCell = document.body.querySelector(`#c-${(COLS_COUNT + 1) * i}`);
        winCell.classList.add('win', 'diagonal-right');
    }
    document.body.querySelector(`[class*='won-title']`).classList.remove('hidden');
    document.body.querySelector(`[class*='won-message']`).innerHTML = firstCell.classList.contains('r') ?
        'Toes won!' :
        'Croses won!';
    return true;
}

function DiagonalLeft() {
    let firstCell = document.body.querySelector(`#c-${COLS_COUNT - 1}`);
    let anyCell;
    for (let i = 1; i <= COLS_COUNT; i++) {
        anyCell = document.body.querySelector(`#c-${(COLS_COUNT - 1) * i}`);
        if (firstCell.classList.item(1) === null) {
            return false;
        }
        else if (firstCell.classList.item(1) !== anyCell.classList.item(1)) {
            return false;
        }
    }
    for (let i = 1; i <= COLS_COUNT; i++) {
        anyCell = document.body.querySelector(`#c-${(COLS_COUNT - 1) * i}`);
        anyCell.classList.add('win', 'diagonal-left');
    }
    document.body.querySelector(`[class*='won-title']`).classList.remove('hidden');
    document.body.querySelector(`[class*='won-message']`).innerHTML = firstCell.classList.contains('r') ?
        'Toes won!' :
        'Croses won!';
    return true;
}

function Vertical(id) {
    let firstCell;
    let anyCell;
    firstCell = document.body.querySelector(`#c-${id}`);
    for (let i = 0; i < COLS_COUNT; i++) {
        anyCell = document.body.querySelector(`#c-${COLS_COUNT * i + id}`);
        if (anyCell.classList.item(1) === null) {
            return false;
        }
        else if (firstCell.classList.item(1) !== anyCell.classList.item(1)) {
            return false;
        }
    }
    for (let i = 0; i < COLS_COUNT; i++) {
        anyCell = document.body.querySelector(`#c-${COLS_COUNT * i + id}`);
        anyCell.classList.add('win', 'vertical');
    }
    document.body.querySelector(`[class*='won-title']`).classList.remove('hidden');
    document.body.querySelector(`[class*='won-message']`).innerHTML = firstCell.classList.contains('r') ?
        'Toes won!' :
        'Croses won!';
    return true;
}

function Horizontal(id) {
    let firstCell;
    let anyCell;
    firstCell = document.body.querySelector(`#c-${id * COLS_COUNT}`);
    for (let i = 0; i < COLS_COUNT; i++) {
        anyCell = document.body.querySelector(`#c-${id * COLS_COUNT + i}`);
        if (firstCell.classList.item(1) === null) return false;
        else if (firstCell.classList.item(1) !== anyCell.classList.item(1)) {
            return false;
        }
    }
    for (let i = 0; i < COLS_COUNT; i++) {
        anyCell = document.body.querySelector(`#c-${id * COLS_COUNT + i}`);
        anyCell.classList.add('win', 'horizontal')
    }
    document.body.querySelector(`[class*='won-title']`).classList.remove('hidden');
    document.body.querySelector(`[class*='won-message']`).innerHTML = firstCell.classList.contains('r') ?
        'Toes won!' :
        'Croses won!';
    return true;
}
