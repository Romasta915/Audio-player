// !!! - this symbol indicates the most important sections of the code
// !* - this symbol indicates subsections of the main sections


// !!! PLAYER LOGIC
// !* variable assignment
const audioTag: HTMLAudioElement = document.getElementById('audioTag') as HTMLAudioElement
const songPoster: HTMLImageElement = document.getElementById('songPoster') as HTMLImageElement
const btnPlay: HTMLElement = document.getElementById('btnPlay')
const btnPrev: HTMLElement = document.getElementById('btnPrev')
const btnNext: HTMLElement = document.getElementById('btnNext')
const currentDuration: HTMLElement = document.getElementById('currentDuration')
const allDuration: HTMLElement = document.getElementById('allDuration')
const durationRange: HTMLInputElement = document.getElementById('durationRange') as HTMLInputElement
const volumeRange: HTMLInputElement = document.getElementById('volumeRange') as HTMLInputElement
volumeRange.min = '0'
volumeRange.max = '1'
const titleAuthor: HTMLElement = document.getElementById('titleAuthor')
const songTitle: HTMLElement = document.getElementById('songTitle')
const songwriter: HTMLElement = document.getElementById('songwriter')
const rootStyles: CSSStyleDeclaration = getComputedStyle(document.documentElement)
let pageLoader: HTMLElement = document.querySelector('.loader')
let intervalId: number
let currentIndex: number = 0
if (parseInt(localStorage.getItem('currentSongIndex')) > -1) {
  currentIndex = parseInt(localStorage.getItem('currentSongIndex'))
}

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
    'Twenty one pilots'
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
function nextSong() {
  currentIndex++
  currentIndex > localMusik.length - 1 ? currentIndex = 0 : null

  if (menuIsOpen) determiningActiveSongInMenu()

  localStorage.setItem('currentSongIndex', currentIndex.toString())

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

function prevSong() {
  currentIndex--
  currentIndex < 0 ? currentIndex = localMusik.length - 1 : null

  localStorage.setItem('currentSongIndex', currentIndex.toString())

  if (menuIsOpen) determiningActiveSongInMenu()

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
  document.title = `${localMusik[currentIndex].title} | Audio player`
  console.log(`Metadata: ${currentIndex + 1}.${localMusik[currentIndex].title} uploaded, The numbers are drawn`);
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

function determiningActiveSongInMenu() {
  const item = document.querySelectorAll('.songMenuItem')
  for (let j = 0; j < localMusik.length; j++) {
    item[j].classList.remove('active')
  }
  item[currentIndex].classList.add('active')
}


// !* listeners
if (parseInt(localStorage.getItem('currentSongIndex')) > -1) {
  songTitle.innerText = localMusik[currentIndex].title
  audioTag.src = `./assets/songs/${localMusik[currentIndex].filePath}`
  songPoster.src = `./assets/img/${localMusik[currentIndex].posterPath}`
  songwriter.innerText = localMusik[currentIndex].author
}

audioTag.addEventListener("loadstart", () => {
  pageLoader.style.display = "flex";
})
audioTag.addEventListener('loadedmetadata', () => {
  drawingTheDuration()
  pageLoader.style.display = "none";
});
audioTag.addEventListener("error", () => {
  pageLoader.style.display = "none";
  alert('download error try reload page :(')
})

audioTag.addEventListener('ended', nextSong)

btnNext.addEventListener('click', nextSong)
document.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight') nextSong() })

btnPrev.addEventListener('click', prevSong)
document.addEventListener('keydown', (event) => { if (event.key === 'ArrowLeft') prevSong() })

btnPlay.addEventListener('click', pauseOrContinue)
document.addEventListener('keydown', function (event) { if (event.key === ' ') pauseOrContinue() })

durationRange.addEventListener('input', () => {
  audioTag.currentTime = parseInt(durationRange.value)
  currentDuration.innerText = splitTime(audioTag.currentTime)
})

if (localStorage.getItem('currentVolume') != null) {
  audioTag.volume = parseFloat(localStorage.getItem('currentVolume'))
  volumeRange.value = localStorage.getItem('currentVolume').toString()
} else audioTag.volume = 0.30
volumeRange.addEventListener('input', () => {
  audioTag.volume = parseFloat(volumeRange.value)
  localStorage.setItem('currentVolume', volumeRange.value)
})
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    if (audioTag.volume < 1) {
      audioTag.volume = audioTag.volume + 0.05
      volumeRange.value = (parseFloat(volumeRange.value) + 0.05).toString()
      localStorage.setItem('currentVolume', volumeRange.value)
    }
  }
})
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    if (audioTag.volume > 0) {
      audioTag.volume = audioTag.volume - 0.05
      volumeRange.value = (parseFloat(volumeRange.value) - 0.05).toString()
      localStorage.setItem('currentVolume', volumeRange.value)
    }
  }
})

titleAuthor.addEventListener('click', () => {
  window.open(`https://www.google.com/search?q=${localMusik[currentIndex].author}, ${localMusik[currentIndex].title}`, '_blank');
})


// !!! menu logic
// !* variable assignment
const songListMenu: HTMLElement = document.getElementById('songListMenu')
const btnSongMenu: HTMLButtonElement = document.getElementById('btnSongMenu') as HTMLButtonElement
let menuIsOpen: boolean = false
let renderSongsOneTime: boolean = false
const playerTheme: HTMLSelectElement = document.getElementById('playerTheme') as HTMLSelectElement
const plThemes = [
  {
    tName: 'default',
    primaryColor: '#394670',
    tintColor: '#ff424b',
    playerBackground: 'rgb(22, 38, 61, 0.7)',
    backImage: 'url(./assets/img/default.jpg)'
  },
  {
    tName: 'holy-random',
    primaryColor: '#394670',
    tintColor: '#ffffff',
    playerBackground: 'rgb(22, 38, 61, 0.7)',
    backImage: 'url(https://picsum.photos/1980/1020)'
  },
  {
    tName: 'cold-blue',
    primaryColor: '#191d88',
    tintColor: '#d5b084',
    playerBackground: 'rgb(0, 80, 136, 0.7)',
    backImage: 'url(./assets/img/cold-blue.jpg)'
  },
  {
    tName: 'inferno-red',
    primaryColor: '#640a13',
    tintColor: '#eb372f',
    playerBackground: 'rgb(12, 12, 14, 0.7)',
    backImage: 'url(./assets/img/inferno-red.jpg)'
  },
  {
    tName: 'calm-green',
    primaryColor: '#a2ff86',
    tintColor: '#17594a',
    playerBackground: 'rgb(26, 93, 26, 0.7)',
    backImage: 'url(./assets/img/calm-green.jpg)'
  },
  {
    tName: 'abstract-red',
    primaryColor: '#450505',
    tintColor: '#d40d10',
    playerBackground: 'rgb(25, 25, 25, 0.7)',
    backImage: 'url(./assets/img/abstract-red.jpg)'
  },
  {
    tName: 'galaxy-pink',
    primaryColor: '#cb388b',
    tintColor: '#9b4795',
    playerBackground: 'rgb(25, 25, 25, 0.6)',
    backImage: 'url(./assets/img/galaxy-pink.jpg)'
  }
]

// !* listeners
if (localStorage.getItem('songMenuIsOpen') === 'true') {
  openSongsMenu()
}
btnSongMenu.addEventListener('click', () => {
  if (menuIsOpen == true) {
    closeSongsMenu()
  } else {
    openSongsMenu()
  }
})

if (localStorage.getItem('pageTheme') != null) {
  let res = plThemes.find((e) => { return e.tName === localStorage.getItem('pageTheme') })
  document.documentElement.style.setProperty('--primary-color', res.primaryColor)
  document.documentElement.style.setProperty('--tint-color', res.tintColor)
  document.documentElement.style.setProperty('--playerBackground', res.playerBackground)
  document.body.style.backgroundImage = `${res.backImage}`
  playerTheme.value = localStorage.getItem('pageTheme')
}
playerTheme.addEventListener('change', () => {
  let val = playerTheme.value
  let res = plThemes.find((e) => { return e.tName === val })
  localStorage.setItem('pageTheme', `${res.tName}`)
  document.documentElement.style.setProperty('--primary-color', res.primaryColor)
  document.documentElement.style.setProperty('--tint-color', res.tintColor)
  document.documentElement.style.setProperty('--playerBackground', res.playerBackground)
  document.body.style.backgroundImage = `${res.backImage}`
})

// !* functions
function drawingList() {
  for (let i = 0; i < localMusik.length; i++) {
    const item = document.createElement('div')
    songListMenu.appendChild(item)
    item.classList.add('songMenuItem')
    item.setAttribute('data-index', (i + 1).toString())

    const itemImg = document.createElement('img')
    item.appendChild(itemImg)
    itemImg.src = `./assets/img/${localMusik[i].posterPath}`

    const textContainer = document.createElement('div')
    item.appendChild(textContainer)
    textContainer.classList.add('textContainer')

    const itemTitle = document.createElement('div')
    textContainer.appendChild(itemTitle)
    itemTitle.innerText = localMusik[i].title
    itemTitle.classList.add('itemTitle')

    const itemAuthor = document.createElement('div')
    textContainer.appendChild(itemAuthor)
    itemAuthor.innerText = localMusik[i].author
    itemAuthor.classList.add('itemAuthor')
  }
}

function switchSongOnClick() {
  for (let i = 0; i < localMusik.length; i++) {
    const item = document.querySelectorAll('.songMenuItem')
    if (menuIsOpen == true) {
      if (parseInt(localStorage.getItem('currentSongIndex')) > -1) {
        item[parseInt(localStorage.getItem('currentSongIndex'))].classList.add('active')
      } else {
        item[0].classList.add('active')
      }
    }

    item[i].addEventListener('click', () => {
      songTitle.innerText = localMusik[i].title
      audioTag.src = `./assets/songs/${localMusik[i].filePath}`
      songPoster.src = `./assets/img/${localMusik[i].posterPath}`
      songwriter.innerText = localMusik[i].author
      currentIndex = i

      localStorage.setItem('currentSongIndex', currentIndex.toString())

      if (audioTag.paused) {
        audioTag.play()
        songPoster.style.animation = 'rotateDisk 7.5s 0.25s linear infinite'
        btnPlay.style.backgroundImage = 'url(./assets/icons/pause.png)'

        intervalId = setInterval(() => {
          currentDuration.innerText = splitTime(audioTag.currentTime)
          durationRange.value = audioTag.currentTime.toString()
        }, 1000)
      }

      for (let j = 0; j < localMusik.length; j++) {
        item[j].classList.remove('active')
      }
      item[i].classList.add('active')
    })
  }
}

function openSongsMenu() {
  songListMenu.classList.add('open')
  btnSongMenu.innerText = 'close'
  localStorage.setItem('songMenuIsOpen', 'true')
  menuIsOpen = !menuIsOpen
  renderSongsOneTime ? null : drawingList(), switchSongOnClick()
  renderSongsOneTime = true
}

function closeSongsMenu() {
  songListMenu.classList.remove('open')
  localStorage.setItem('songMenuIsOpen', 'false')
  btnSongMenu.innerText = 'menu'
  menuIsOpen = !menuIsOpen
}