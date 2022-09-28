let elemTableDiv = document.querySelector('.table');
let elemTable = document.querySelector('.table__tik');
let elemRow = document.querySelectorAll('.row');

function tableCreate() {
    let tableTd = document.querySelectorAll('td');
    for(let i = 0; i < tableTd.length; i++) {       
        tableTd[i].style.width = '50px';
        tableTd[i].style.height = '50px';
        tableTd[i].style.border = 'black solid 1px';
    }
}
tableCreate();

let countBomba;

function rundomMine(min) {
    let tableTd = document.querySelectorAll('td');
    let tdAllLength = tableTd.length - 1;    
    for(let i = 0; i < tdAllLength / 3; i++) {
        let rand = min + Math.random() * (tdAllLength + 1 - min);
        let index = Math.floor(rand);
        let rundomTd = tableTd[index];
        rundomTd.innerHTML = 'bomb';
    }
}
rundomMine(0);



function countBomb(elem) {
    let tableTd = document.querySelectorAll('td');
    for(let i = 0; i < tableTd.length; i++) {
        if(tableTd[i].innerHTML == 'bomb') {
            countBomba = ++elem
        }
    }
}
countBomb(0);

function button() {
    let winBlockItem = document.querySelector('.win__block');
    if(winBlockItem) {
        winBlockItem.remove();
        elemTable.addEventListener('click', colorTarget, false);
    }
    elemRow.forEach((elem) => {
        elem.style.background = 'rgba(0, 0, 0, 1)';
        elem.innerText = '';
    });
    rundomMine(0);
    
   countBomb(0);
}

let x = false;

function colorTarget(e) {
    e.stopPropagation();    
    if(!x) {
        e.target.style.background = 'white';
        x = false;
    }
    if(e.target.innerText == 'bomb') {
        finishGame();
        finishDraw();
        
        let elemTableDiv = document.querySelector('.new__game');
        elemTableDiv.addEventListener('click', button, false);
    }

    let arr = [];
    let siblingsNewPerentsArr = [];
    let siblingsNewPerentsPreviousArr = [];
    let siblingsNew = e.target.parentElement;
    let siblingsNewPerents = siblingsNew.nextElementSibling;
    let siblingsNewPerentsPrevious = siblingsNew.previousElementSibling;

    
    
    arr.push(Array.prototype.slice.call(siblingsNew.children));
    if(siblingsNewPerents != null) {
        siblingsNewPerentsArr.push(Array.prototype.slice.call(siblingsNewPerents.children));
    }
    if(siblingsNewPerentsPrevious != null) {
        siblingsNewPerentsPreviousArr.push(Array.prototype.slice.call(siblingsNewPerentsPrevious.children));
    }
    
    let newArr = arr.flat();
    let newArrsNewPerentsArr = siblingsNewPerentsArr.flat();
    let newArrPerentsPreviousArr = siblingsNewPerentsPreviousArr.flat();
    let  indexElemNewArr = Number(newArr.indexOf(e.target));
    let countElem = 0;

    let i = 1;
    if(indexElemNewArr <= 1) {
        i = 0;
    }
    if(indexElemNewArr > 1) {
        i = indexElemNewArr - 1;
    }
    for(i; i <= indexElemNewArr + 1; i++) {
        if(newArr[i] != null && newArr[i].innerText == 'bomb') {            
            countElem++
        }        
        if(newArrsNewPerentsArr[i] != null && newArrsNewPerentsArr[i].innerText == 'bomb') {
            countElem++
        }
        if(newArrPerentsPreviousArr[i] != null && newArrPerentsPreviousArr[i].innerText == 'bomb') {
            countElem++
        }
        if(indexElemNewArr > 0) {
            indexElemNewArr + 1;
    
        }
        
    }
    if(e.target.innerHTML != 'bomb') {
        e.target.innerHTML = `<span>${countElem}</span>`;
    }

    disabled();
    winYou();
}

function winYou() {
    let tableTd = document.querySelectorAll('td');
    let elemWin = tableTd.length - countBomba;
    let arrCells = [];
    for(let i = 0; i < tableTd.length; i++) {
        if(tableTd[i].childElementCount > 0) {
            arrCells.push(tableTd[i]);
        }
    }
    
    if(arrCells.length == elemWin) {
        finishGame();

        let elemTableDiv = document.querySelector('.new__game');
        elemTableDiv.addEventListener('click', button, false);
    }
}

function disabled() {
    let tableTd = document.querySelectorAll('td');
    tableTd.forEach((elem) => {
        elem.removeEventListener('click', colorTarget, false);
    });
}


function finishGame() {
    let winBlock = document.createElement('div');
    let newGame = document.createElement('button');
    elemTableDiv.before(winBlock);

    winBlock.className = 'win__block';

    newGame.className = 'new__game';
    newGame.innerText = 'NEW GAME';

    winBlock.innerHTML = `<p class ="win__block__text">YOU WIN</p>`

    let winBlockItem = document.querySelector('.win__block');
    winBlockItem.append(newGame);
    winBlockItem.style.display = 'flex';
}

function finishDraw() {

    elemRow.forEach((elem) => {
        elem.style.background = 'rgba(0, 0, 0, 0.5)';
    });

    let drowText = document.querySelector('.win__block__text');
    drowText.innerHTML = 'Game Over'
    
    let winBlockItem = document.querySelector('.win__block');
    winBlockItem.classList.add('win__block__drow');
}


elemTable.addEventListener('click', colorTarget, false);