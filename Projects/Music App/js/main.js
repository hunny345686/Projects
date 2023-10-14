const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
let isPlaying = false;

const playmusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};

const pausemusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  isPlaying ? pausemusic() : playmusic();
});

// Change music track

const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const songs = [
  {
    name: "Bol Do Na Zara",
    title: "Bol Do Na Zara",
    artist: "arijeet singh",
    img: "lep3.jpg",
  },
  {
    name: "Main-Hoon-Na",
    title: "Main-Hoon-Na",
    artist: "Sonu Nigam",
    img: "lep2.jpg",
  },
  {
    name: "Fitoor",
    title: "Fitoor",
    artist: "Udit Narayan Nigam",
    img: "stulep.jpg",
  },
];

const loadsongs = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "music/" + songs.name + ".mp3";
  img.src = "img/" + songs.img;
};

songindex = 0;

const nextsong = () => {
  songindex = (songindex + 1) % songs.length;
  loadsongs(songs[songindex]);
  playmusic();
};

const prevsong = () => {
  songindex = (songindex - 1 + songs.length) % songs.length;
  loadsongs(songs[songindex]);
  playmusic();
};

// progress barr section start

let progress = document.getElementById("progress");
let duration_of = document.getElementById("duration");
let current_time = document.getElementById("currunt_time");
let progress_div = document.getElementById("progress_div");

music.addEventListener("timeupdate", (event) => {
  const currentTime = event.srcElement.currentTime;
  const duration = event.srcElement.duration;

  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  // music duration update
  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);
  let tot_dur = `${min_duration}:${sec_duration}`;

  if (duration) {
    duration_of.innerHTML = `${tot_dur}`;
  }
  // music current time

  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);
  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  let tot_currenttime = `${min_currentTime}:${sec_currentTime}`;
  current_time.innerHTML = `${tot_currenttime}`;
});

progress_div.addEventListener("click", (event) => {
  const { duration } = music;
  let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
  music.currentTime = move_progress;
});

music.addEventListener("ended", nextsong);

next.addEventListener("click", nextsong);
prev.addEventListener("click", prevsong);
