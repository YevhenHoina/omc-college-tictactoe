let arrayOfActions = []
document.body.addEventListener('click', function (event) {
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
        arrayOfActions.push(event.target);
        document.body.querySelector(`[class*='undo-btn btn']`).removeAttribute('disabled');
    }
})
//smth wrong
document.body.querySelector(`[class*='undo-btn btn']`).addEventListener('click', function () {
    let victimCell = arrayOfActions[arrayOfActions.length - 1];
    victimCell.classList.remove('ch', 'r');
    if (arrayOfActions.length === 0) {
        document.body.querySelector(`[class*='undo-btn btn']`).setAttribute('disabled', 'disabled');
    }
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
        winCell.classList.add('win', ' diagonal-right');
    }
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
    return true;
}
