"use strict";
const inputSaved = document.querySelector('input');
const buttonSaved = document.querySelector('#save');
const listTasks = document.querySelector('#saved__tasks');
let localHtml;


        buttonSaved.addEventListener('click', (e) => {
            e.preventDefault();
            const task = document.createElement('li');
                  task.setAttribute('id', 'task');

            const span = document.createElement('span');
                  span.setAttribute('id', 'inner__text');

            const buttonCheck = document.createElement('input');
                  buttonCheck.setAttribute('id', 'checkbox');
                  buttonCheck.setAttribute('type', 'checkbox');

            const buttonDelete = document.createElement('input');
                  buttonDelete.setAttribute('id', 'delete__task');
                  buttonDelete.setAttribute('type', 'submit');
                  buttonDelete.setAttribute('value', 'x');

            if(inputSaved.value != '') {
                listTasks.appendChild(task);
                task.appendChild(span);
                span.innerHTML = inputSaved.value;
                task.appendChild(buttonCheck);
                task.appendChild(buttonDelete);
                inputSaved.value = '';
            }
            toLocal();
            buttonList();
        });
 function buttonList() {
        const child = document.querySelectorAll('li');
        child.forEach((item) => {
            const checkbox = item.querySelector('#checkbox');
            const deleteTaskButton = item.querySelector('#delete__task');
            const spanText = item.querySelector('span');

            checkbox.addEventListener('click', () => {
                spanText.style.textDecoration = 'line-through';
                item.style.background = 'coral'
                checkbox.setAttribute('checked', 'checked');
                if(!checkbox.checked) {
                    checkbox.removeAttribute('checked');
                    spanText.style.textDecoration = 'none';
                    item.style.background = 'rgba(154, 197, 137, 0.712)'
                }                
                toLocal();
            });
            
            deleteTaskButton.addEventListener('click', (e) => {
                e.preventDefault();
                item.remove();
                toLocal();
            });                  
        });
        toLocal();
    }
    function toLocal() {
        localHtml = listTasks.innerHTML;
        localStorage.setItem('todo', localHtml);
    }
// const todo = new ToDo();

if(localStorage.getItem('todo')) {
    listTasks.innerHTML = localStorage.getItem('todo');
    buttonList();
}

// toLocal();
// buttonList();










// let num = prompt('num');
// if(!(num >= 14 && num <= 90)) {
//     console.log('eeeee');
// } else {
//     console.log('noooo');
// }
// if(num < 14 || num > 90) {
//     console.log('eeeee');
// } else {
//     console.log('noooo');
// }
// if(nameScript > 0) {
//     console.log('1');
// } else if(nameScript < 0) {
//     console.log('-1');
// } else if(nameScript == 0) {
//     console.log('0');
// }
// var a = 1;
// var b = 4;
// console.log(a + b < 4 ? 'malo' : 'mnogo');