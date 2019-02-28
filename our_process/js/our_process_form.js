let buttonActiv = document.querySelector('.form__activ');

buttonActiv.addEventListener('click', function() {
    let form = document.getElementById('showHide');
    
    if(form.style.display == 'none') {
        form.style.display = 'flex';
    } else {
        form.style.display = 'none'
    }   
});
let inputForm = document.getElementsByClassName('check-in__person__info');
let formButtonDisable = document.querySelector('.check-in__button__user--item');
for(let i = 0; i < inputForm.length; i++) {
    inputForm[i].oninput = function(e) {
        if(!isNaN(inputForm[i].value)) {
            inputForm[i].classList.add('check-in__person__info__mistake');
        }
    }
}