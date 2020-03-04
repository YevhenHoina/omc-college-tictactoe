let arrayOfCells = [];
    for (let i = 0; i < (COLS_COUNT * ROWS_COUNT); i++){
        arrayOfCells.push(document.body.querySelector('#c-' + i))
    }


// window.addEventListener('load', function(){
//     //diagonal-right
//     for (let i = 0; i < COLS_COUNT; i++){
//         arrayOfCells[(COLS_COUNT + 1) * i].classList.add('diagonal-right')
//     }
//     //diagonal-left
//     for (let i = 1; i <= COLS_COUNT; i++){
//         arrayOfCells[(COLS_COUNT - 1) * i].classList.add('diagonal-left')
//     }
// })
document.body.addEventListener('click', function(){
    
})