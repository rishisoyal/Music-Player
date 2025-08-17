// Import playlist
import { playlists } from "./songData.js";

async function main() {
  const play_btn = document.getElementById("play-btn");
  const prev_btn = document.getElementById("prev-btn");
  const next_btn = document.getElementById("next-btn");
  // const slider = document.getElementById("slider");
  const slider_input = document.getElementById("slider-input");
  // const volume_slider = document.getElementById("volume-slider");
  const volume_input = document.getElementById("volume-input");
  const music_list = document.getElementById("music-list");
  const play_list = document.getElementById("playlist");
  const poster_img = document.getElementById("poster");
  const music_name = document.getElementById("music-name");
  // const playlist_name = document.getElementById("playlist-name");
  const current_time = document.getElementById("current-time");
  const total_duration = document.getElementById("total-duration");

  let current_playlist = playlists["Alan Walker"];
  let current_song_index = 0;
  let current_song = new Audio(current_playlist[current_song_index].src);

  function formatedTime(time) {
    let m = Math.floor(time / 60);
    let s = Math.floor(time % 60);
    if (m < 10) {
      m = `0${m}`;
    }
    if (s < 10) {
      s = `0${s}`;
    }
    return `${m}:${s}`
  }

  function updateSongInfo(song) {
    current_song.src = song.src;
    current_song.load();
    poster_img.src = song.poster;
    music_name.innerText = song.src.split("\\").pop().replace(".mp3", "");
    document.title = music_name.innerText;

    current_song.addEventListener("loadedmetadata", () => {
      console.log("Audio duration:", current_song.duration);
      total_duration.innerText = formatedTime(current_song.duration);
      slider_input.max = current_song.duration;
      slider_input.value = 0;
    });

    // update current song time
    current_song.addEventListener("timeupdate", () => {
      if (!slider_input.dragging) {
        slider_input.value = current_song.currentTime;
        current_time.innerText = formatedTime(current_song.currentTime);
      }
    });
  }

  updateSongInfo(current_playlist[current_song_index]);
  current_song.volume = 0.5;

  // requestAnimationFrame(() => {
  //   const volumeWidth = volume_slider.offsetWidth;
  //   const initialVolume = current_song.volume;
  //   volume_ball.style.left = `${initialVolume * volumeWidth - volume_ball.offsetWidth / 2}px`;
  // });

  CreateSongList();



  slider_input.addEventListener('input', function () {
    current_song.currentTime = parseFloat(slider_input.value);
  })

  volume_input.addEventListener('change', function () {
    current_song.volume = volume_input.value / 100;
  })

  function CreateSongList() {
    music_list.innerHTML = "";
    for (let i = 0; i < current_playlist.length; i++) {
      const li = document.createElement("li");
      const poster = document.createElement("img");
      poster.src = current_playlist[i].poster;
      li.appendChild(poster);
      li.append(current_playlist[i].src.split("\\").pop().replace(".mp3", ""));
      music_list.appendChild(li);

      li.addEventListener("click", () => {
        current_song_index = i;
        updateSongInfo(current_playlist[current_song_index]);
        current_song.play();
        play_btn.innerText = "Pause";
      });
    }
  }

  for (const playlist in playlists) {
    const li = document.createElement("li");
    li.innerText = playlist;
    play_list.appendChild(li);

    li.addEventListener("click", function () {
      current_playlist = playlists[li.innerText];
      current_song_index = 0;
      updateSongInfo(current_playlist[current_song_index]);
      current_song.play();
      play_btn.innerText = "Pause";
      CreateSongList();
    });
  }

  play_btn.addEventListener("click", () => {
    if (current_song.paused) {
      current_song.play();
      play_btn.innerText = "Pause";
    } else {
      current_song.pause();
      play_btn.innerText = "Play";
    }
  });

  prev_btn.addEventListener("click", () => {
    if (current_song_index > 0) {
      current_song_index--;
      updateSongInfo(current_playlist[current_song_index]);
      current_song.play();
      play_btn.innerText = "Pause";
    }
  });

  next_btn.addEventListener("click", () => {
    if (current_song_index < current_playlist.length - 1) {
      current_song_index++;
      updateSongInfo(current_playlist[current_song_index]);
      current_song.play();
      play_btn.innerText = "Pause";
    }
  });
}


main();


