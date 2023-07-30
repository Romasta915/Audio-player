// !!! - this symbol indicates the most important sections of the code
// !* - this symbol indicates subsections of the main sections


// !!! PLAYER LOGIC
// !* variable assignment
let audioTag: HTMLAudioElement = document.getElementById('audioTag') as HTMLAudioElement
let songPoster: HTMLImageElement = document.getElementById('songPoster') as HTMLImageElement
let btnPlay: HTMLElement = document.getElementById('btnPlay')
let btnPrev: HTMLElement = document.getElementById('btnPrev')
let btnNext: HTMLElement = document.getElementById('btnNext')
let currentDuration: HTMLElement = document.getElementById('currentDuration')
let allDuration: HTMLElement = document.getElementById('allDuration')
let durationRange: HTMLInputElement = document.getElementById('durationRange') as  HTMLInputElement
let volumeRange: HTMLInputElement = document.getElementById('volumeRange') as  HTMLInputElement
volumeRange.min = '0'
volumeRange.max = '1'
let songTitle: HTMLElement = document.getElementById('songTitle')
let songwriter: HTMLElement = document.getElementById('songwriter')
let intervalId: number
let currentIndex = 0

class localSong {
  title: string;
  filePath: string;
  posterPath: string;
  author: string;

  constructor(_title: string, _filePath: string, _posterPath: string, _author: string) {
    this.title = _title;
    this.filePath = _filePath;
    this.posterPath = _posterPath;
    this.author = _author;
  }
}

const localMusik = [
  new localSong(
    'Гуцул метал',
    '1 Karna_-_Vtrolom_(musmore.com).mp3',
    '1 karna.jpg',
    'Карна'
  ),
  new localSong(
    'We are',
    '2 thousand_foot_krutch_-_we_are_(zvukoff.ru).mp3',
    '2 we are.jpg',
    'Thousand foot krutch'
  ),
  new localSong(
    'Lane boy',
    '3 Twenty One Pilots - Lane Boy.mp3',
    '3 Twenty One Pilots - Lane Boy.jpeg',
    'Twenty one pisots'
  ),
  new localSong(
    'Teardrops',
    '4 Ai Mori Teardrops (Bring Me The Horizon cover)_(allmp3.su).mp3',
    '4 bring me the horizon.jpg',
    'Bring me the horizon (Ai mori cover)'
  ),
  new localSong(
    'Dacadane',
    '5 disturbed_-_decadance_(zvukoff.ru).mp3',
    '5 decadance.jpg',
    'Distributed'
  ),
  new localSong(
    'Jailhouse rock',
    '6 Elvis Presley - jailhouse rock.mp3',
    '6 Elvis.jpg',
    'Elvis presley'
  ),
  new localSong(
    'Юморист',
    '7 FACE_-_YUmorist_(musmore.com).mp3',
    '7 face.jpg',
    'FACE'
  ),
  new localSong(
    'Du hast',
    '8 Rammstein_-_Du_Hast_(musmore.com).mp3',
    '8 rammstain.jpg',
    'Rammstain'
  )
]


// !* functions
function nextGroup() {
  currentIndex > localMusik.length - 1 ? currentIndex = 0 : currentIndex++

  songTitle.innerText = localMusik[currentIndex].title
  audioTag.src = `./assets/songs/${localMusik[currentIndex].filePath}`
  songPoster.src = `./assets/img/${localMusik[currentIndex].posterPath}`
  songwriter.innerText = localMusik[currentIndex].author

  if (audioTag.paused) {
    audioTag.play()
    songPoster.style.animation = 'rotateDisk 7.5s 0.25s linear infinite'
    btnPlay.style.backgroundImage = 'url(./assets/icons/pause.png)'

    intervalId = setInterval(() => {
      currentDuration.innerText = splitTime(audioTag.currentTime)
      durationRange.value = audioTag.currentTime.toString()
    }, 1000)
  }
}

function prevGroup() {
  currentIndex < 0 ? currentIndex = localMusik.length - 1 : currentIndex--

  songTitle.innerText = localMusik[currentIndex].title
  audioTag.src = `./assets/songs/${localMusik[currentIndex].filePath}`
  songPoster.src = `./assets/img/${localMusik[currentIndex].posterPath}`
  songwriter.innerText = localMusik[currentIndex].author

  if (audioTag.paused) {
    audioTag.play()
    songPoster.style.animation = 'rotateDisk 7.5s 0.25s linear infinite'
    btnPlay.style.backgroundImage = 'url(./assets/icons/pause.png)'

    intervalId = setInterval(() => {
      currentDuration.innerText = splitTime(audioTag.currentTime)
      durationRange.value = audioTag.currentTime.toString()
    }, 1000)
  }
}

function splitTime(sec: number) {
  let seconds: any = Math.floor(sec % 60)
  if (seconds < 10) {
    seconds = `0${Math.floor(sec % 60)}`
  }
  return `${Math.floor(sec / 60)}:${seconds}`
}

function drawingTheDuration() {
  allDuration.innerText = splitTime(audioTag.duration)
  durationRange.min = '0'
  durationRange.max = audioTag.duration.toString()
}

function pauseOrContinue() {
  if (audioTag.paused) {
    audioTag.play()
    btnPlay.style.backgroundImage = 'url(./assets/icons/pause.png)'
    songPoster.style.animation = 'rotateDisk 7.5s 0.25s linear infinite'

    intervalId = setInterval(() => {
      currentDuration.innerText = splitTime(audioTag.currentTime)
      durationRange.value = audioTag.currentTime.toString()
    }, 1000)
  } else {
    audioTag.pause()
    btnPlay.style.backgroundImage = 'url(./assets/icons/play.png)'
    clearInterval(intervalId)
    songPoster.style.animation = 'none'
  }
}


// !* listeners
audioTag.addEventListener('loadedmetadata', drawingTheDuration);
audioTag.addEventListener('ended', nextGroup)
btnNext.addEventListener('click', nextGroup)
document.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight') nextGroup() })
btnPrev.addEventListener('click', prevGroup)
document.addEventListener('keydown', (event) => { if (event.key === 'ArrowLeft') prevGroup() })
btnPlay.addEventListener('click', pauseOrContinue)
document.addEventListener('keydown', function (event) { if (event.key === ' ') pauseOrContinue() });
durationRange.addEventListener('input', () => {
  audioTag.currentTime = parseInt(durationRange.value)
  currentDuration.innerText = splitTime(audioTag.currentTime)
})
volumeRange.addEventListener('input', () => {
  audioTag.volume = parseInt(volumeRange.value)
})


// !!! menu logic
let contMenu = document.getElementById('contMenu')
contMenu.style.padding = '10px'

for (let i = 0; i < localMusik.length; i++) {
  let item = document.createElement('div')
  contMenu.appendChild(item)
  item.setAttribute('class', 'items')
  item.style.display = 'flex'
  item.style.margin = '10px 0'
  item.style.padding = '10px'
  item.style.borderRadius = '10px'
  item.style.background = 'linear-gradient(to right, #240b36, #c31432)'

  let imgSection = document.createElement('div')
  item.appendChild(imgSection)
  imgSection.style.width = '40px'
  imgSection.style.height = '40px'
  let imgLine = document.createElement('img')

  imgSection.appendChild(imgLine)
  imgLine.src = `./assets/img/${localMusik[i].posterPath}`
  imgLine.style.width = '40px'
  imgLine.style.height = '40px'

  let itemTitle = document.createElement('div')
  item.appendChild(itemTitle)
  itemTitle.innerText = localMusik[i].title
  itemTitle.style.fontSize = '20px'
  itemTitle.style.marginLeft = '20px'
  itemTitle.style.display = 'flex'
  itemTitle.style.alignItems = 'center'
  itemTitle.style.fontWeight = 'bold'

  let itemSongwriter = document.createElement('marquee')
  item.appendChild(itemSongwriter)
  itemSongwriter.innerText = localMusik[i].author
  itemSongwriter.style.fontSize = '20px'
  itemSongwriter.style.marginLeft = '20px'
  itemSongwriter.style.display = 'flex'
  itemSongwriter.style.alignItems = 'center'
  itemSongwriter.style.fontWeight = 'bold'
}