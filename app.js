/* ==========================================================================
   UP ROADWAYS (UpBusPlay) - Native YouTube Playlist Audio Engine
   Loads user's exact playlist (PLeatb7hupNV_AWUl_7ttbsKeCQh8tF5N4)
   ========================================================================== */

(function () {
  'use strict';

  // 1. Bus Driver ki Playlist Database
  let TRACKS = [];

  // Fetch playlist from tracks.json as the Single Source of Truth
  async function loadPlaylistData() {
    try {
      const res = await fetch('tracks.json');
      if (res.ok) {
        const data = await res.json();
        TRACKS = data.map((item, idx) => ({
          id: item.id || idx + 1,
          title: item.title,
          artist: item.artist,
          duration: item.duration,
          ytId: item.ytId,
          cover: item.cover || 'assets/up_bus_cover.png',
          src: item.src || `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(idx % 10) + 1}.mp3`
        }));
      }
    } catch (err) {
      console.warn("Could not fetch tracks.json, using fallback:", err);
    }
    if (TRACKS.length > 0) {
      loadTrack(0, false);
    }
  }

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
  const btnHorn = document.getElementById('btn-horn');

  const playerTitle = document.getElementById('player-title');
  const playerArtist = document.getElementById('player-artist');
  const playerCover = document.getElementById('player-cover');
  const progressContainer = document.getElementById('progress-container');
  const progressFill = document.getElementById('progress-fill');
  const timeCurrent = document.getElementById('time-current');
  const timeDuration = document.getElementById('time-duration');
  const clockDisplay = document.getElementById('clock-display');

  // Initialize YouTube Native Playlist IFrame Player
  window.onYouTubeIframeAPIReady = function () {
    try {
      ytPlayer = new YT.Player('yt-player', {
        height: '1',
        width: '1',
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin || '*',
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
          },
          onError: function (e) {
            console.warn("YouTube Player Error code:", e.data);
            // Fallback to HTML5 audio engine automatically
            if (isPlaying) {
              audio.src = TRACKS[currentIdx].src;
              audio.play().catch(() => {});
            }
          }
        }
      });
    } catch (e) {
      console.warn("YouTube Player initialization warning:", e);
    }
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

  // ==========================================================================
  // Real-Time Auto-Syncing Passenger Counter Engine
  // Synchronizes live visitor count across active browsers/tabs
  // ==========================================================================
  const liveCountEl = document.getElementById('live-count');
  const tabId = 'passenger_' + Math.random().toString(36).substr(2, 9);
  
  // 1. Local Multi-Tab Sync via localStorage & BroadcastChannel
  function getActiveTabCount() {
    try {
      const now = Date.now();
      const tabs = JSON.parse(localStorage.getItem('up_bus_tabs') || '{}');
      tabs[tabId] = now;
      
      let activeCount = 0;
      for (const id in tabs) {
        if (now - tabs[id] < 10000) {
          activeCount++;
        } else {
          delete tabs[id];
        }
      }
      localStorage.setItem('up_bus_tabs', JSON.stringify(tabs));
      return activeCount;
    } catch (e) {
      return 1;
    }
  }

  // Heartbeat to refresh tab presence
  setInterval(() => {
    getActiveTabCount();
    updatePassengerDisplay();
  }, 2500);

  window.addEventListener('storage', (e) => {
    if (e.key === 'up_bus_tabs') {
      updatePassengerDisplay();
    }
  });

  window.addEventListener('beforeunload', () => {
    try {
      const tabs = JSON.parse(localStorage.getItem('up_bus_tabs') || '{}');
      delete tabs[tabId];
      localStorage.setItem('up_bus_tabs', JSON.stringify(tabs));
    } catch (e) {}
  });

  // 2. Firebase Realtime Database Global Multi-Device Presence Sync
  let firebaseOnlineCount = 0;
  try {
    const firebaseConfig = {
      databaseURL: "https://uproadways-bus-default-rtdb.firebaseio.com"
    };
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
      firebase.initializeApp(firebaseConfig);
      const db = firebase.database();
      const myRef = db.ref('passengers/' + tabId);
      const allRef = db.ref('passengers');

      db.ref('.info/connected').on('value', (snap) => {
        if (snap.val() === true) {
          myRef.onDisconnect().remove();
          myRef.set({ online: true, ts: firebase.database.ServerValue.TIMESTAMP });
        }
      });

      allRef.on('value', (snap) => {
        if (snap.exists()) {
          firebaseOnlineCount = snap.numChildren();
        } else {
          firebaseOnlineCount = 0;
        }
        updatePassengerDisplay();
      });
    }
  } catch (err) {
    console.log("Firebase presence init note:", err);
  }

  // Realistic Passenger Base Simulation for UP Highway Journey
  let simulatedPassengers = Math.floor(Math.random() * 5) + 3; // 3 to 7 passengers base

  // Smooth fluctuation every 14 seconds to mimic passengers boarding/debarking at stops
  setInterval(() => {
    const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
    simulatedPassengers = Math.max(1, Math.min(18, simulatedPassengers + delta));
    updatePassengerDisplay();
  }, 14000);

  function updatePassengerDisplay() {
    const localTabs = getActiveTabCount();
    const activeVisitors = Math.max(localTabs, firebaseOnlineCount);
    const totalPassengers = activeVisitors + (simulatedPassengers - 1);

    if (liveCountEl) {
      const cur = parseInt(liveCountEl.textContent) || 0;
      if (cur !== totalPassengers) {
        liveCountEl.style.transition = 'transform 0.2s ease, color 0.2s ease';
        liveCountEl.style.transform = 'scale(1.35)';
        liveCountEl.style.color = '#4ade80';
        liveCountEl.textContent = totalPassengers;
        setTimeout(() => {
          liveCountEl.style.transform = 'scale(1)';
          liveCountEl.style.color = '';
        }, 300);
      }
    }
  }

  updatePassengerDisplay();

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

    audio.src = track.src;

    if (isYtReady && ytPlayer && typeof ytPlayer.playVideoAt === 'function') {
      try {
        ytPlayer.playVideoAt(currentIdx);
      } catch (e) {}
    }

    if (autoPlay || isPlaying) {
      playAudio();
    }
  }

  function playAudio() {
    initAudioCtx();
    isPlaying = true;
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
    playerCover.classList.add('playing');
    startTimeTracker();

    if (isYtReady && ytPlayer && typeof ytPlayer.playVideo === 'function') {
      try {
        ytPlayer.playVideo();
      } catch (err) {}
    }

    // Safety fallback to HTML5 audio if YouTube is blocked or paused
    setTimeout(() => {
      const ytState = (ytPlayer && typeof ytPlayer.getPlayerState === 'function') ? ytPlayer.getPlayerState() : -1;
      if (ytState !== 1) { // 1 = YT.PlayerState.PLAYING
        if (!audio.src || audio.src === window.location.href || audio.ended) {
          audio.src = TRACKS[currentIdx].src;
        }
        audio.play().catch(() => {});
      }
    }, 450);
  }

  function pauseAudio() {
    if (isYtReady && ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
      try { ytPlayer.pauseVideo(); } catch (e) {}
    }
    audio.pause();
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
    let nextIdx = currentIdx - 1;
    if (nextIdx < 0) nextIdx = TRACKS.length - 1;
    loadTrack(nextIdx, true);
  }

  function nextTrack() {
    let nextIdx = currentIdx + 1;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * TRACKS.length);
    } else if (nextIdx >= TRACKS.length) {
      nextIdx = 0;
    }
    loadTrack(nextIdx, true);
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

  // Web Audio Synthesized Engine for Bus Horn
  let audioCtx = null;

  function initAudioCtx() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtx();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Load local bus horn audio file
  const hornAudio = new Audio('assets/Horn-Sound.mp3');
  hornAudio.preload = 'auto';

  // ==========================================================================
  // Play Authentic Indian Bus Air Horn Sound from assets
  // ==========================================================================
  function playIndianBusHorn() {
    initAudioCtx(); // Keep this for user gesture / audio context alignment if needed
    hornAudio.currentTime = 0;
    hornAudio.play().catch(err => {
      console.warn("Error playing horn audio:", err);
    });
  }

  let hornCooldown = false;
  btnHorn.addEventListener('click', () => {
    if (hornCooldown) return;
    hornCooldown = true;

    btnHorn.classList.add('horn-playing');
    playIndianBusHorn();

    btnHorn.style.transform = 'scale(0.9)';
    btnHorn.style.transition = 'transform 0.08s ease';
    setTimeout(() => {
      btnHorn.style.transform = '';
    }, 180);

    // Prevent spam-clicking (cooldown matches horn duration, fallback to 1.6s)
    const cooldownMs = (isFinite(hornAudio.duration) && hornAudio.duration > 0) 
      ? hornAudio.duration * 1000 
      : 1600;

    setTimeout(() => {
      hornCooldown = false;
      btnHorn.classList.remove('horn-playing');
    }, cooldownMs);
  });

  // Controls Event Listeners
  btnPlay.addEventListener('click', togglePlay);
  btnPrev.addEventListener('click', prevTrack);
  btnNext.addEventListener('click', nextTrack);
  btnShuffle.addEventListener('click', () => {
    isShuffle = !isShuffle;
    btnShuffle.style.color = isShuffle ? '#4ade80' : 'rgba(255,255,255,0.8)';
  });

  // Initialize - Load tracks dynamically from tracks.json
  loadPlaylistData();

})();
