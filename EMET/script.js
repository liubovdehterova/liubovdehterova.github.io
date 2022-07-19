let pastTime = document.querySelector('.audio__track__currentTime');
let remainderTime = document.querySelector('.audio__track__remainder');
let inputLine = document.querySelector('input[type="range"]');
let btnPlay = document.querySelector('#play');
let btnPause = document.querySelector('#pause');
let isPlaying = false;
let i = 0;
let myAudio = new Audio('sound/sample-15s.mp3');


setInterval(() => {
    if(isPlaying) {
        let myAudioLength = Math.floor(myAudio.duration);
        let seconds = Math.floor(myAudio.currentTime);
        let minutes = 0;
        if (minutes < 10 && seconds < 59) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if((myAudioLength - i) >= 0) {
            remainderTime.innerHTML = '-' + minutes + ':' + (myAudioLength - i);
        } else {
            remainderTime.innerHTML = '-' + minutes + ':' + myAudioLength;
            i = 0;
        }
        console.log(myAudioLength);
        pastTime.innerHTML = minutes + ':' + seconds;
        onPlayTimeAnimation();
    }
}, 1000);

function onPlayTimeAnimation() {
    let myAudioLength = Math.floor(myAudio.duration);
    inputLine.max = myAudioLength;
    if (inputLine.value <= myAudioLength) {
        inputLine.value = ++i;
    }
}

function rewindNextPlay() {
    if(myAudio.duration - myAudio.currentTime >= 15) {
        myAudio.currentTime += 15;
        i += 15;
    } else {
        myAudio.currentTime = Math.floor(myAudio.duration - 1);
        i = Math.floor(myAudio.currentTime);
    }
}

function rewindNextPast() {
    if(myAudio.currentTime > 15) {
        myAudio.currentTime -= 15;
        i -= 15;
    } else {
        myAudio.currentTime = 0;
        i = 0;
    }
}

function play() {
    myAudio.play();
    btnPause.style.display = 'block';
    btnPlay.style.display = 'none';
}


function pause() {
    myAudio.pause();
    btnPlay.style.display = 'block';
    btnPause.style.display = 'none';
}

myAudio.onplaying = function () {
    isPlaying = true;
};
myAudio.onpause = function () {
    isPlaying = false;
};
myAudio.muted = false;
function mute() {
    let disableMute = document.querySelector('.audio__track__muted__false');
    let enableMute = document.querySelector('.audio__track__muted__true');
    if(myAudio.muted) {
        myAudio.muted = false;
        disableMute.style.display = 'none';
        enableMute.style.display = 'block';
    } else {
        myAudio.muted = true;
        disableMute.style.display = 'block';
        enableMute.style.display = 'none';
    }
}
