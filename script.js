const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const progressSlider = document.getElementById('progress-slider');
const progressContainer = document.querySelector('.progress-container');
const timeDuration = document.getElementById('time-duration');
const video = document.getElementById('video');
const sliderStartPosition = progressSlider.getBoundingClientRect();
const progressBarWidth = progressContainer.clientWidth;
let sliderFinalPosition;

// Add event listeners
video.addEventListener('click', playPauseVideo);
playBtn.addEventListener('click', playPauseVideo);
stopBtn.addEventListener('click', stopVideo);
video.addEventListener('timeupdate', displayTimeDuration);

progress.addEventListener('click', (e) => {
  if (e.clientX >= sliderStartPosition.left && e.clientX <= progressBarWidth + sliderStartPosition.left) {
    video.currentTime = (video.duration * (e.clientX - sliderStartPosition.left)) / progressBarWidth;
    video.pause();
    playPauseVideo();
  }
});

progressSlider.addEventListener('dragend', (e) => {
  if (e.clientX > sliderStartPosition.left && e.clientX <= progressBarWidth + sliderStartPosition.left) {
    sliderFinalPosition =
      e.clientX >= sliderStartPosition.left + progressBarWidth - sliderStartPosition.width
        ? sliderStartPosition.left + progressBarWidth
        : e.clientX;
    const sliderProgressTime = (video.duration * (sliderFinalPosition - sliderStartPosition.x)) / progressBarWidth;
    video.currentTime = sliderProgressTime;
    video.pause();
    playPauseVideo();
  }
});

function playPauseVideo() {
  displayTimeDuration();
  if (video.paused) {
    playBtn.classList.add('playing');
    document.querySelector('#play>i').classList.add('fa-pause');
    document.querySelector('#play>i').classList.remove('fa-play');
    video.play();
  } else {
    playBtn.classList.remove('playing');
    document.querySelector('#play>i').classList.remove('fa-pause');
    document.querySelector('#play>i').classList.add('fa-play');
    video.pause();
  }
}

function stopVideo() {
  video.pause();
  video.currentTime = 0;
  document.querySelector('#play>i').classList.remove('fa-pause');
  document.querySelector('#play>i').classList.add('fa-play');
  displayTimeDuration();
}

function displayTimeDuration() {
  let time, seconds, minutes, hours;
  let { currentTime, duration } = video;

  time = Math.floor(currentTime);

  if (time < 60) {
    seconds = Math.floor(time);
    minutes = 0;
  } else {
    if (time >= 60) {
      seconds = time % 60;
      minutes = Math.floor(time / 60);
    }
    if (minutes >= 60) {
      hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
    }
  }
  displayTimeDurationUI(hours, minutes, seconds);
  updateProgressUI(currentTime, duration);
  setTimeout(() => {
    if (currentTime === duration) {
      stopVideo();
    }
  }, 500);
}

function updateProgressUI(currentTime, duration) {
  const progressPercent = (currentTime / duration) * 100;
  progressSlider.style.left = progressPercent !== 100 ? `${progressPercent}%` : `calc(${progressPercent}% - 7px)`;
}

function displayTimeDurationUI(hours, minutes, seconds) {
  let time;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  hours ? (time = `${hours}:${minutes}:${seconds}`) : (time = `${minutes}:${seconds}`);
  timeDuration.textContent = time;
}
