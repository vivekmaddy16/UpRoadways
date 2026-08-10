/* ==========================================================================
   UP ROADWAYS (UpBusPlay) - Native YouTube Playlist Audio Engine
   Loads user's exact playlist (PLeatb7hupNV_AWUl_7ttbsKeCQh8tF5N4)
   ========================================================================== */

(function () {
  'use strict';

  // 1. Bus Driver ki Playlist Database
  const TRACKS = [
    { id: 1, title: "Saaton Janam Main Tere", artist: "Kumar Sanu & Alka Yagnik", duration: "6:02", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: 2, title: "Mujhse Mohabbat Ka Izhaar", artist: "Kumar Sanu & Alka Yagnik", duration: "6:15", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { id: 3, title: "Tumsa Koi Pyaara", artist: "Kumar Sanu & Alka Yagnik", duration: "5:45", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: 4, title: "Waada Raha Sanam", artist: "Abhijeet & Alka Yagnik", duration: "6:08", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { id: 5, title: "Chhupana Bhi Nahin Aata", artist: "Vinod Rathod", duration: "7:01", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { id: 6, title: "Jhanjharia", artist: "Abhijeet Bhattacharya", duration: "5:20", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    { id: 7, title: "Husn Hai Suhana", artist: "Abhijeet & Chandana Dixit", duration: "6:00", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
    { id: 8, title: "Jeeye To Jeeye Kaise", artist: "Kumar Sanu, SPB & Alka Yagnik", duration: "6:38", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { id: 9, title: "Pehli Pehli Baar Mohabbat Ki Hai", artist: "Kumar Sanu & Alka Yagnik", duration: "7:40", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
    { id: 10, title: "To Chalun", artist: "Roopkumar Rathod", duration: "7:10", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
    { id: 11, title: "Tumhein Dekhen Meri Aankhen", artist: "Kumar Sanu & Alka Yagnik", duration: "6:50", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: 12, title: "Raah Mein Unse Mulaqat", artist: "Kumar Sanu & Alka Yagnik", duration: "6:16", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { id: 13, title: "Tu Jo Hans Hans Ke", artist: "Udit Narayan & Kavita Krishnamurthy", duration: "5:55", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: 14, title: "Dil Kehta Hai", artist: "Kumar Sanu & Alka Yagnik", duration: "6:42", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { id: 15, title: "Ae Kash Ke Hum", artist: "Kumar Sanu", duration: "5:10", cover: "assets/up_bus_cover.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
  ];

  let currentIdx = 0;
  let isPlaying = false;
  let isShuffle = false;
  let ytPlayer = null;
  let isYtReady = false;
  let timeUpdateInterval = null;

  // DOM elements
  const audio = document.getElementById('audio-engine');
  const btnPlay = document.getElementById('btn-play');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnShuffle = document.getElementById('btn-shuffle');
  const btnPlaylist = document.getElementById('btn-playlist');
  const btnHorn = document.getElementById('btn-horn');

  const playerTitle = document.getElementById('player-title');
  const playerArtist = document.getElementById('player-artist');
  const playerCover = document.getElementById('player-cover');
  const progressContainer = document.getElementById('progress-container');
  const progressFill = document.getElementById('progress-fill');
  const timeCurrent = document.getElementById('time-current');
  const timeDuration = document.getElementById('time-duration');
  const clockDisplay = document.getElementById('clock-display');

  const modalPlaylist = document.getElementById('modal-playlist');
  const closePlaylist = document.getElementById('close-playlist');
  const playlistContainer = document.getElementById('playlist-container');

  // Initialize YouTube Native Playlist IFrame Player
  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player('yt-player', {
      height: '1',
      width: '1',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0,
        listType: 'playlist',
        list: 'PLeatb7hupNV_AWUl_7ttbsKeCQh8tF5N4'
      },
      events: {
        onReady: function () {
          isYtReady = true;
        },
        onStateChange: function (event) {
          if (event.data === YT.PlayerState.PLAYING) {
            isPlaying = true;
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
            playerCover.classList.add('playing');
            startTimeTracker();
            syncTrackDetails();
          } else if (event.data === YT.PlayerState.PAUSED) {
            isPlaying = false;
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
            playerCover.classList.remove('playing');
            stopTimeTracker();
          } else if (event.data === YT.PlayerState.ENDED) {
            nextTrack();
          }
        }
      }
    });
  };

  // Sync track details from YouTube playlist index
  function syncTrackDetails() {
    if (isYtReady && ytPlayer && typeof ytPlayer.getPlaylistIndex === 'function') {
      const idx = ytPlayer.getPlaylistIndex();
      if (idx >= 0 && idx < TRACKS.length) {
        currentIdx = idx;
        const track = TRACKS[currentIdx];
        playerTitle.textContent = track.title;
        playerArtist.textContent = track.artist;
        playerCover.src = track.cover;
        renderPlaylistItems();
      }
    }
  }

  // Real-time Clock
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minsStr = minutes < 10 ? '0' + minutes : minutes;
    clockDisplay.textContent = `${hours}:${minsStr} ${ampm}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Load Track by index
  function loadTrack(idx, autoPlay = true) {
    if (idx < 0) idx = TRACKS.length - 1;
    if (idx >= TRACKS.length) idx = 0;
    currentIdx = idx;

    const track = TRACKS[currentIdx];
    playerTitle.textContent = track.title;
    playerArtist.textContent = track.artist;
    playerCover.src = track.cover;

    progressFill.style.width = '0%';
    timeCurrent.textContent = '0:00';
    timeDuration.textContent = track.duration;

    if (isYtReady && ytPlayer && typeof ytPlayer.playVideoAt === 'function') {
      if (autoPlay || isPlaying) {
        ytPlayer.playVideoAt(currentIdx);
        isPlaying = true;
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        playerCover.classList.add('playing');
      }
    } else {
      audio.src = track.src;
      if (autoPlay || isPlaying) {
        audio.play().then(() => {
          isPlaying = true;
          iconPlay.style.display = 'none';
          iconPause.style.display = 'block';
          playerCover.classList.add('playing');
        }).catch(() => {});
      }
    }

    renderPlaylistItems();
  }

  function playAudio() {
    if (isYtReady && ytPlayer && typeof ytPlayer.playVideo === 'function') {
      ytPlayer.playVideo();
      isPlaying = true;
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      playerCover.classList.add('playing');
    } else {
      audio.play().then(() => {
        isPlaying = true;
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        playerCover.classList.add('playing');
      }).catch(() => {
        startSynthMelody();
        isPlaying = true;
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        playerCover.classList.add('playing');
      });
    }
  }

  function pauseAudio() {
    if (isYtReady && ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
      ytPlayer.pauseVideo();
    } else {
      audio.pause();
      stopSynthMelody();
    }
    isPlaying = false;
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    playerCover.classList.remove('playing');
    stopTimeTracker();
  }

  function togglePlay() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  function prevTrack() {
    if (isYtReady && ytPlayer && typeof ytPlayer.previousVideo === 'function') {
      ytPlayer.previousVideo();
      isPlaying = true;
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      playerCover.classList.add('playing');
    } else {
      loadTrack(currentIdx - 1, true);
    }
  }

  function nextTrack() {
    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * TRACKS.length);
      loadTrack(randomIdx, true);
    } else if (isYtReady && ytPlayer && typeof ytPlayer.nextVideo === 'function') {
      ytPlayer.nextVideo();
      isPlaying = true;
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      playerCover.classList.add('playing');
    } else {
      loadTrack(currentIdx + 1, true);
    }
  }

  // Seeker Progress Tracker
  function startTimeTracker() {
    stopTimeTracker();
    timeUpdateInterval = setInterval(() => {
      if (isYtReady && ytPlayer && ytPlayer.getCurrentTime && ytPlayer.getDuration) {
        const cur = ytPlayer.getCurrentTime();
        const dur = ytPlayer.getDuration();
        if (dur > 0) {
          const pct = (cur / dur) * 100;
          progressFill.style.width = pct + '%';
          timeCurrent.textContent = formatTime(cur);
          timeDuration.textContent = formatTime(dur);
        }
      }
    }, 500);
  }

  function stopTimeTracker() {
    if (timeUpdateInterval) {
      clearInterval(timeUpdateInterval);
      timeUpdateInterval = null;
    }
  }

  audio.addEventListener('timeupdate', () => {
    if (!isYtReady && audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = pct + '%';
      timeCurrent.textContent = formatTime(audio.currentTime);
      timeDuration.textContent = formatTime(audio.duration);
    }
  });

  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (isYtReady && ytPlayer && ytPlayer.getDuration) {
      const targetTime = pct * ytPlayer.getDuration();
      ytPlayer.seekTo(targetTime, true);
    } else if (audio.duration) {
      audio.currentTime = pct * audio.duration;
    }
  });

  function formatTime(sec) {
    if (isNaN(sec) || sec <= 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // Web Audio Synthesized Fallback Melody
  let audioCtx = null;
  let synthTimer = null;

  function initAudioCtx() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtx();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function startSynthMelody() {
    initAudioCtx();
    if (synthTimer) return;
    const notes = [329.63, 392.00, 440.00, 523.25, 587.33];
    let nIdx = 0;
    synthTimer = setInterval(() => {
      if (!isPlaying || !audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notes[nIdx % notes.length], audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
      nIdx++;
    }, 500);
  }

  function stopSynthMelody() {
    if (synthTimer) {
      clearInterval(synthTimer);
      synthTimer = null;
    }
  }

  // Authentic Vintage Bus Horn Sound (POOO-POOO!)
  function playIndianBusHorn() {
    initAudioCtx();
    const now = audioCtx.currentTime;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';

    osc1.frequency.setValueAtTime(370, now);
    osc2.frequency.setValueAtTime(445, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.setValueAtTime(0, now + 0.18);
    gain.gain.setValueAtTime(0.25, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.55);
    osc2.stop(now + 0.55);
  }

  btnHorn.addEventListener('click', () => {
    playIndianBusHorn();
    btnHorn.style.transform = 'scale(0.92)';
    setTimeout(() => {
      btnHorn.style.transform = 'scale(1)';
    }, 150);
  });

  // Render Playlist Modal Items
  function renderPlaylistItems() {
    playlistContainer.innerHTML = '';
    TRACKS.forEach((t, i) => {
      const item = document.createElement('div');
      item.className = `playlist-track-item ${i === currentIdx ? 'active' : ''}`;
      item.innerHTML = `
        <img src="${t.cover}" alt="Cover" class="playlist-thumb">
        <div class="playlist-track-info">
          <div class="playlist-title">${t.title}</div>
          <div class="playlist-artist">${t.artist}</div>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: rgba(255,255,255,0.6);">${t.duration}</div>
      `;
      item.addEventListener('click', () => {
        loadTrack(i, true);
        modalPlaylist.classList.remove('active');
      });
      playlistContainer.appendChild(item);
    });
  }

  // Playlist Modal Events
  btnPlaylist.addEventListener('click', () => {
    renderPlaylistItems();
    modalPlaylist.classList.add('active');
  });
  closePlaylist.addEventListener('click', () => {
    modalPlaylist.classList.remove('active');
  });
  modalPlaylist.addEventListener('click', (e) => {
    if (e.target === modalPlaylist) modalPlaylist.classList.remove('active');
  });

  // Controls Event Listeners
  btnPlay.addEventListener('click', togglePlay);
  btnPrev.addEventListener('click', prevTrack);
  btnNext.addEventListener('click', nextTrack);
  btnShuffle.addEventListener('click', () => {
    isShuffle = !isShuffle;
    btnShuffle.style.color = isShuffle ? '#4ade80' : 'rgba(255,255,255,0.8)';
  });

  // Initialize
  loadTrack(0, false);

})();
