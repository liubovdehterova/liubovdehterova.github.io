const endtime = '2022-11-20T19:00:00+03:00';

// приводим к стандартному виду 03:04:05, вместо 3:4:5
function makeCorrectDate(uncorrectDate) {
    let correctDate = uncorrectDate;
    if (uncorrectDate < 10) {
        correctDate = '0' + uncorrectDate;
    }
    return correctDate;
}

// сколько времени осталось
function getDateRemaining(timesup) {
    // total = оставшееся вермя
    const total = Date.parse(timesup) - Date.now();
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    // вывод объектов
    return {
        'total': total,
        'days': days,
        'hours': hours,
        'minutes': minutes
    };
}

// инициализация таймера на самом сайте
function setTime(id, timesup) {
    let timer = document.getElementById(id),
        days = timer.querySelector('.days'),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        // обновление таймера каждые 1000мс
        timeInterval = setInterval(update, 1000);

    function update() {
        // результат функции getDateRemaining
        let total = getDateRemaining(timesup);
        // Проверка на ноль
        let nowdate = Date.now();
        if (nowdate <= Date.parse(endtime)) {
            nowdate = Date.now();
            days.textContent = makeCorrectDate(total.days);
            hours.textContent = makeCorrectDate(total.hours);
            minutes.textContent = makeCorrectDate(total.minutes);
        } else {
            days.textContent = 0;
            hours.textContent = 0;
            minutes.textContent = 0;
        }


        // Окончания часов
        switch (total.days) {
            case 1:
            case 21:
            case 31:
            case 41:
            case 51:
                correctDays = "ДЕНЬ";
                // console.log(total.days, correctDays); // DEBUG
                break;
            case 2:
            case 3:
            case 4:
            case 22:
            case 23:
            case 24:
            case 32:
            case 33:
            case 34:
            case 42:
            case 43:
            case 44:
            case 52:
            case 53:
            case 54:
                correctDays = "ДНЯ";
                // console.log(total.days, correctDays); // DEBUG
                break;
            default:
                correctDays = "ДНЕЙ";
            // console.log(total.days, correctDays); // DEBUG
        }
        document.querySelector('.uncorrectDays').textContent = correctDays;

        // Окончания часов
        switch (total.hours) {
            case 1:
            case 21:
            case 31:
            case 41:
            case 51:
                correctHours = "ЧАС";
                // console.log(total.hours, correctHours); // DEBUG
                break;
            case 2:
            case 3:
            case 4:
            case 22:
            case 23:
            case 24:
            case 32:
            case 33:
            case 34:
            case 42:
            case 43:
            case 44:
            case 52:
            case 53:
            case 54:
                correctHours = "ЧАСА";
                // console.log(total.hours, correctHours); // DEBUG
                break;
            default:
                correctHours = "ЧАСОВ";
            // console.log(total.hours, correctHours); // DEBUG
        }
        document.querySelector('.uncorrectHours').textContent = correctHours;

        // Окончания минут
        switch (total.minutes) {
            case 1:
            case 21:
            case 31:
            case 41:
            case 51:
                correctMinutes = "МИНУТА";
                // console.log(total.minutes, correctMinutes); // DEBUG
                break;
            case 2:
            case 3:
            case 4:
            case 22:
            case 23:
            case 24:
            case 32:
            case 33:
            case 34:
            case 42:
            case 43:
            case 44:
            case 52:
            case 53:
            case 54:
                correctMinutes = "МИНУТЫ";
                // console.log(total.minutes, correctMinutes); // DEBUG
                break;
            default:
                correctMinutes = "МИНУТ";
            // console.log(total.minutes, correctMinutes); // DEBUG
        }
        document.querySelector('.uncorrectMinutes').textContent = correctMinutes;
    }
}
setTime('timer', endtime);

function hide(e) {
    let target = e.currentTarget;
    let elem = target.querySelector('.faq_answer');
    if(elem.style.display !== "block") {
        elem.style.display = "block";
    } else {
        elem.style.display = "none";
    }
}
let ps = document.getElementsByClassName('faq_row');

for(let i = 0; i < ps.length; i++){
    ps[i].addEventListener('click', hide, false);
}

//Comments
let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function(){
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    let comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now() / 1000)
    }

    commentName.value = '';
    commentBody.value = '';

    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments (){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item){
        out += `<p class="alert alert-primary" role="alert">${item.name}</p>`;
        out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="alert alert-success" role="alert">${item.body}</p>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
}