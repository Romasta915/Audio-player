const audioTag = document.getElementById('audioTag');
const songPoster = document.getElementById('songPoster');
const btnPlay = document.getElementById('btnPlay');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const currentDuration = document.getElementById('currentDuration');
const allDuration = document.getElementById('allDuration');
const durationRange = document.getElementById('durationRange');
const volumeRange = document.getElementById('volumeRange');
volumeRange.min = '0';
volumeRange.max = '1';
const titleAuthor = document.getElementById('titleAuthor');
const songTitle = document.getElementById('songTitle');
const songwriter = document.getElementById('songwriter');
const rootStyles = getComputedStyle(document.documentElement);
let pageLoader = document.querySelector('.loader');
let intervalId;
let currentIndex = 0;
class localSong {
    constructor(_title, _filePath, _posterPath, _author) {
        this.title = _title;
        this.filePath = _filePath;
        this.posterPath = _posterPath;
        this.author = _author;
    }
}
const localMusik = [
    new localSong('Гуцул метал', '1 Karna_-_Vtrolom_(musmore.com).mp3', '1 karna.jpg', 'Карна'),
    new localSong('We are', '2 thousand_foot_krutch_-_we_are_(zvukoff.ru).mp3', '2 we are.jpg', 'Thousand foot krutch'),
    new localSong('Lane boy', '3 Twenty One Pilots - Lane Boy.mp3', '3 Twenty One Pilots - Lane Boy.jpeg', 'Twenty one pilots'),
    new localSong('Teardrops', '4 Ai Mori Teardrops (Bring Me The Horizon cover)_(allmp3.su).mp3', '4 bring me the horizon.jpg', 'Bring me the horizon (Ai mori cover)'),
    new localSong('Dacadane', '5 disturbed_-_decadance_(zvukoff.ru).mp3', '5 decadance.jpg', 'Distributed'),
    new localSong('Jailhouse rock', '6 Elvis Presley - jailhouse rock.mp3', '6 Elvis.jpg', 'Elvis presley'),
    new localSong('Юморист', '7 FACE_-_YUmorist_(musmore.com).mp3', '7 face.jpg', 'FACE'),
    new localSong('Du hast', '8 Rammstein_-_Du_Hast_(musmore.com).mp3', '8 rammstain.jpg', 'Rammstain')
];
function nextSong() {
    const item = document.querySelectorAll('.songMenuItem');
    for (let j = 0; j < localMusik.length; j++) {
        item[j].classList.remove('active');
    }
    currentIndex > localMusik.length - 1 ? currentIndex = 0 : currentIndex++;
    item[currentIndex].classList.add('active');
    songTitle.innerText = localMusik[currentIndex].title;
    audioTag.src = `./assets/songs/${localMusik[currentIndex].filePath}`;
    songPoster.src = `./assets/img/${localMusik[currentIndex].posterPath}`;
    songwriter.innerText = localMusik[currentIndex].author;
    if (audioTag.paused) {
        audioTag.play();
        songPoster.style.animation = 'rotateDisk 7.5s 0.25s linear infinite';
        btnPlay.style.backgroundImage = 'url(./assets/icons/pause.png)';
        intervalId = setInterval(() => {
            currentDuration.innerText = splitTime(audioTag.currentTime);
            durationRange.value = audioTag.currentTime.toString();
        }, 1000);
    }
}
function prevSong() {
    const item = document.querySelectorAll('.songMenuItem');
    for (let j = 0; j < localMusik.length; j++) {
        item[j].classList.remove('active');
    }
    currentIndex < 0 ? currentIndex = localMusik.length - 1 : currentIndex--;
    item[currentIndex].classList.add('active');
    songTitle.innerText = localMusik[currentIndex].title;
    audioTag.src = `./assets/songs/${localMusik[currentIndex].filePath}`;
    songPoster.src = `./assets/img/${localMusik[currentIndex].posterPath}`;
    songwriter.innerText = localMusik[currentIndex].author;
    if (audioTag.paused) {
        audioTag.play();
        songPoster.style.animation = 'rotateDisk 7.5s 0.25s linear infinite';
        btnPlay.style.backgroundImage = 'url(./assets/icons/pause.png)';
        intervalId = setInterval(() => {
            currentDuration.innerText = splitTime(audioTag.currentTime);
            durationRange.value = audioTag.currentTime.toString();
        }, 1000);
    }
}
function splitTime(sec) {
    let seconds = Math.floor(sec % 60);
    if (seconds < 10) {
        seconds = `0${Math.floor(sec % 60)}`;
    }
    return `${Math.floor(sec / 60)}:${seconds}`;
}
function drawingTheDuration() {
    allDuration.innerText = splitTime(audioTag.duration);
    durationRange.min = '0';
    durationRange.max = audioTag.duration.toString();
    console.log('Цифри відмальовано');
}
function pauseOrContinue() {
    if (audioTag.paused) {
        audioTag.play();
        btnPlay.style.backgroundImage = 'url(./assets/icons/pause.png)';
        songPoster.style.animation = 'rotateDisk 7.5s 0.25s linear infinite';
        intervalId = setInterval(() => {
            currentDuration.innerText = splitTime(audioTag.currentTime);
            durationRange.value = audioTag.currentTime.toString();
        }, 1000);
    }
    else {
        audioTag.pause();
        btnPlay.style.backgroundImage = 'url(./assets/icons/play.png)';
        clearInterval(intervalId);
        songPoster.style.animation = 'none';
    }
}
audioTag.addEventListener("loadstart", () => {
    pageLoader.style.display = "flex";
});
audioTag.addEventListener('loadedmetadata', () => {
    drawingTheDuration();
    pageLoader.style.display = "none";
    audioTag.volume = 0.30;
});
audioTag.addEventListener("error", () => {
    pageLoader.style.display = "none";
    alert('download error :(');
});
audioTag.addEventListener('ended', nextSong);
btnNext.addEventListener('click', nextSong);
document.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight')
    nextSong(); });
btnPrev.addEventListener('click', prevSong);
document.addEventListener('keydown', (event) => { if (event.key === 'ArrowLeft')
    prevSong(); });
btnPlay.addEventListener('click', pauseOrContinue);
document.addEventListener('keydown', function (event) { if (event.key === ' ')
    pauseOrContinue(); });
durationRange.addEventListener('input', () => {
    audioTag.currentTime = parseInt(durationRange.value);
    currentDuration.innerText = splitTime(audioTag.currentTime);
});
volumeRange.addEventListener('input', () => {
    audioTag.volume = parseFloat(volumeRange.value);
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        if (audioTag.volume < 1) {
            audioTag.volume = audioTag.volume + 0.05;
            volumeRange.value = (parseFloat(volumeRange.value) + 0.05).toString();
        }
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
        if (audioTag.volume > 0) {
            audioTag.volume = audioTag.volume - 0.05;
            volumeRange.value = (parseFloat(volumeRange.value) - 0.05).toString();
        }
    }
});
titleAuthor.addEventListener('click', () => {
    window.open(`https://www.google.com/search?q=${localMusik[currentIndex].author}, ${localMusik[currentIndex].title}`, '_blank');
});
const songListMenu = document.getElementById('songListMenu');
const btnSongMenu = document.getElementById('btnSongMenu');
let menuIsOpen = false;
let songsIsPainted = false;
btnSongMenu.addEventListener('click', () => {
    if (menuIsOpen === true) {
        songListMenu.classList.remove('open');
        menuIsOpen = !menuIsOpen;
        btnSongMenu.innerText = 'menu';
    }
    else {
        songListMenu.classList.add('open');
        menuIsOpen = !menuIsOpen;
        btnSongMenu.innerText = '✖️';
        songsIsPainted ? null : drawingList(), switchSongOnClick();
        songsIsPainted = true;
    }
});
function drawingList() {
    for (let i = 0; i < localMusik.length; i++) {
        const item = document.createElement('div');
        songListMenu.appendChild(item);
        item.classList.add('songMenuItem');
        item.setAttribute('data-index', (i + 1).toString());
        const itemImg = document.createElement('img');
        item.appendChild(itemImg);
        itemImg.src = `./assets/img/${localMusik[i].posterPath}`;
        const textContainer = document.createElement('div');
        item.appendChild(textContainer);
        textContainer.classList.add('textContainer');
        const itemTitle = document.createElement('div');
        textContainer.appendChild(itemTitle);
        itemTitle.innerText = localMusik[i].title;
        itemTitle.classList.add('itemTitle');
        const itemAuthor = document.createElement('div');
        textContainer.appendChild(itemAuthor);
        itemAuthor.innerText = localMusik[i].author;
        itemAuthor.classList.add('itemAuthor');
    }
}
function switchSongOnClick() {
    for (let i = 0; i < localMusik.length; i++) {
        const item = document.querySelectorAll('.songMenuItem');
        if (audioTag.paused == true) {
            item[0].classList.add('active');
        }
        item[i].addEventListener('click', () => {
            songTitle.innerText = localMusik[i].title;
            audioTag.src = `./assets/songs/${localMusik[i].filePath}`;
            songPoster.src = `./assets/img/${localMusik[i].posterPath}`;
            songwriter.innerText = localMusik[i].author;
            currentIndex = i;
            if (audioTag.paused) {
                audioTag.play();
                songPoster.style.animation = 'rotateDisk 7.5s 0.25s linear infinite';
                btnPlay.style.backgroundImage = 'url(./assets/icons/pause.png)';
                intervalId = setInterval(() => {
                    currentDuration.innerText = splitTime(audioTag.currentTime);
                    durationRange.value = audioTag.currentTime.toString();
                }, 1000);
            }
            for (let j = 0; j < localMusik.length; j++) {
                item[j].classList.remove('active');
            }
            item[i].classList.add('active');
        });
    }
}
//# sourceMappingURL=app.js.map