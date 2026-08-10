/* ==========================================================================
   UP BUS (UpBusPlay) - Full Audio Engine, Canvas Animation & Interactive Logic
   Inspired by saloon.wtf
   ========================================================================== */

(function () {
  'use strict';

  // ==========================================
  // 1. Curated Nostalgic Track Database
  // ==========================================
  const TRACKS = [
    {
      id: 1,
      title: "Pardesi Pardesi (Dhaba Classic)",
      artist: "Kumar Sanu, Alka Yagnik",
      category: "dhaba",
      duration: "4:32",
      cover: "assets/up_bus_cover.png",
      // High reliability audio streams (with Web Audio fallback)
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Sandese Aate Hai (Roadways Express)",
      artist: "Roop Kumar Rathod, Sonu Nigam",
      category: "express",
      duration: "5:15",
      cover: "assets/up_bus_cover.png",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: 3,
      title: "Pehla Nasha (Night Bus Melody)",
      artist: "Udit Narayan, Sadhana Sargam",
      category: "night",
      duration: "4:50",
      cover: "assets/up_bus_cover.png",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      id: 4,
      title: "Chaiyya Chaiyya (Highway Banger)",
      artist: "Sukhwinder Singh, Sapna Awasthi",
      category: "express",
      duration: "4:10",
      cover: "assets/up_bus_cover.png",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
      id: 5,
      title: "Tujhe Dekha Toh Yeh Jaana Sanam",
      artist: "Kumar Sanu, Lata Mangeshkar",
      category: "dhaba",
      duration: "5:02",
      cover: "assets/up_bus_cover.png",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
      id: 6,
      title: "Kajra Re (Purvanchal Night Special)",
      artist: "Alisha Chinai, Shankar Mahadevan",
      category: "purvanchal",
      duration: "4:45",
      cover: "assets/up_bus_cover.png",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
      id: 7,
      title: "Dil To Pagal Hai (Midnight Express)",
      artist: "Lata Mangeshkar, Udit Narayan",
      category: "night",
      duration: "4:20",
      cover: "assets/up_bus_cover.png",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
      id: 8,
      title: "Aankhein Khuli (UP Roadways Hit)",
      artist: "Lata Mangeshkar, Udit Narayan, Shah Rukh Khan",
      category: "dhaba",
      duration: "5:30",
      cover: "assets/up_bus_cover.png",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },
    {
      id: 9,
      title: "Bole Chudiyan (Grand Highway Express)",
      artist: "Amit Kumar, Sonu Nigam, Alka Yagnik",
      category: "express",
      duration: "4:55",
      cover: "assets/up_bus_cover.png",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    {
      id: 10,
      title: "Sasural Genda Phool (Purvanchal Folk)",
      artist: "Rekha Bhardwaj, Shraddha Pandit",
      category: "purvanchal",
      duration: "3:50",
      cover: "assets/up_bus_cover.png",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
    }
  ];

  // State Management
  let currentTrackIndex = 0;
  let isPlaying = false;
  let activeCategory = 'all';
  let filteredTracks = [...TRACKS];

  // DOM Elements
  const audio = document.getElementById('audio-engine');
  const btnPlay = document.getElementById('btn-play');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  
  const playerTitle = document.getElementById('player-title');
  const playerArtist = document.getElementById('player-artist');
  const playerCover = document.getElementById('player-cover');
  const artworkRing = document.getElementById('artwork-ring');
  const playerCard = document.getElementById('player-card');

  const progressContainer = document.getElementById('progress-container');
  const progressFill = document.getElementById('progress-fill');
  const progressThumb = document.getElementById('progress-thumb');
  const timeCurrent = document.getElementById('time-current');
  const timeDuration = document.getElementById('time-duration');

  const modalPlaylist = document.getElementById('modal-playlist');
  const btnOpenPlaylist = document.getElementById('btn-open-playlist');
  const closePlaylist = document.getElementById('close-playlist');
  const trackListContainer = document.getElementById('track-list-container');
  const playlistSearch = document.getElementById('playlist-search');

  const modalTicket = document.getElementById('modal-ticket');
  const btnOpenTicket = document.getElementById('btn-open-ticket');
  const closeTicket = document.getElementById('close-ticket');
  const btnCopyTicket = document.getElementById('btn-copy-ticket');
  const tktSong = document.getElementById('tkt-song');
  const tktArtist = document.getElementById('tkt-artist');
  const tktNumber = document.getElementById('tkt-number');
  const tktDate = document.getElementById('tkt-date');

  const btnEngineAmbient = document.getElementById('btn-engine-ambient');
  const btnRainAmbient = document.getElementById('btn-rain-ambient');
  const passengerCountEl = document.getElementById('passenger-count');

  // Ambient Web Audio Synthesizer State
  let audioCtx = null;
  let engineGainNode = null;
  let rainGainNode = null;
  let isEnginePlaying = false;
  let isRainPlaying = false;

  // ==========================================
  // 2. Audio Player Logic
  // ==========================================

  function loadTrack(index) {
    if (index < 0) index = filteredTracks.length - 1;
    if (index >= filteredTracks.length) index = 0;
    currentTrackIndex = index;

    const track = filteredTracks[currentTrackIndex];
    if (!track) return;

    playerTitle.textContent = track.title;
    playerArtist.textContent = track.artist;
    playerCover.src = track.cover;
    audio.src = track.src;

    // Reset progress
    progressFill.style.width = '0%';
    progressThumb.style.left = '0%';
    timeCurrent.textContent = '0:00';
    timeDuration.textContent = track.duration || '0:00';

    updatePlaylistActiveState();
    updateMediaSession(track);
  }

  function playAudio() {
    initAudioContext();
    audio.play().then(() => {
      isPlaying = true;
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      artworkRing.classList.add('playing');
      playerCard.classList.add('playing');
    }).catch(err => {
      console.log('Playback error or user gesture required:', err);
      // Even if direct audio load fails due to network/CORS, we play synthesized track audio!
      startSynthTrackMelody();
      isPlaying = true;
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      artworkRing.classList.add('playing');
      playerCard.classList.add('playing');
    });
  }

  function pauseAudio() {
    audio.pause();
    stopSynthTrackMelody();
    isPlaying = false;
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    artworkRing.classList.remove('playing');
    playerCard.classList.remove('playing');
  }

  function togglePlay() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  function prevTrack() {
    loadTrack(currentTrackIndex - 1);
    if (isPlaying) playAudio();
  }

  function nextTrack() {
    loadTrack(currentTrackIndex + 1);
    if (isPlaying) playAudio();
  }

  // Seeker Update
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = pct + '%';
    progressThumb.style.left = pct + '%';
    timeCurrent.textContent = formatTime(audio.currentTime);
    timeDuration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    nextTrack();
  });

  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
    if (audio.duration) {
      audio.currentTime = pct * audio.duration;
    }
  });

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  // Media Session API for lockscreen & hardware keys
  function updateMediaSession(track) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: "UP Bus Radio — 90s Bangers",
        artwork: [{ src: track.cover, sizes: '512x512', type: 'image/png' }]
      });

      navigator.mediaSession.setActionHandler('play', playAudio);
      navigator.mediaSession.setActionHandler('pause', pauseAudio);
      navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
      navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
    }
  }

  // ==========================================
  // 3. Web Audio Ambient Sound Synthesizer
  // ==========================================
  function initAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtx();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Engine sound generator (diesel engine chug rumble)
  function toggleEngineAmbient() {
    initAudioContext();
    if (isEnginePlaying) {
      if (engineGainNode) engineGainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.2);
      isEnginePlaying = false;
      btnEngineAmbient.classList.remove('active');
    } else {
      if (!engineGainNode) {
        // Buffer source noise
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Lowpass filter for low engine rumble
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(80, audioCtx.currentTime);

        // LFO for diesel chug rhythm
        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(6.5, audioCtx.currentTime); // 6.5 Hz engine pulse

        const lfoGain = audioCtx.createGain();
        lfoGain.gain.setValueAtTime(30, audioCtx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        engineGainNode = audioCtx.createGain();
        engineGainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(engineGainNode);
        engineGainNode.connect(audioCtx.destination);

        whiteNoise.start();
        lfo.start();
      } else {
        engineGainNode.gain.setTargetAtTime(0.12, audioCtx.currentTime, 0.2);
      }
      isEnginePlaying = true;
      btnEngineAmbient.classList.add('active');
    }
  }

  // Window rain ambiance generator
  function toggleRainAmbient() {
    initAudioContext();
    if (isRainPlaying) {
      if (rainGainNode) rainGainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.2);
      isRainPlaying = false;
      btnRainAmbient.classList.remove('active');
    } else {
      if (!rainGainNode) {
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02; // Pink noise
          lastOut = output[i];
        }

        const rainNoise = audioCtx.createBufferSource();
        rainNoise.buffer = noiseBuffer;
        rainNoise.loop = true;

        const bandpass = audioCtx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(1200, audioCtx.currentTime);
        bandpass.Q.setValueAtTime(0.8, audioCtx.currentTime);

        rainGainNode = audioCtx.createGain();
        rainGainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

        rainNoise.connect(bandpass);
        bandpass.connect(rainGainNode);
        rainGainNode.connect(audioCtx.destination);

        rainNoise.start();
      } else {
        rainGainNode.gain.setTargetAtTime(0.1, audioCtx.currentTime, 0.2);
      }
      isRainPlaying = true;
      btnRainAmbient.classList.add('active');
    }
  }

  // Web Audio synth track fallback oscillator melody
  let synthInterval = null;
  function startSynthTrackMelody() {
    if (synthInterval) return;
    initAudioContext();
    const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88]; // C major scale
    let noteIdx = 0;

    synthInterval = setInterval(() => {
      if (!isPlaying || !audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(notes[noteIdx % notes.length], audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);

      noteIdx++;
    }, 450);
  }

  function stopSynthTrackMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  // ==========================================
  // 4. Playlist Drawer & Filter Logic
  // ==========================================

  function renderPlaylist() {
    trackListContainer.innerHTML = '';

    filteredTracks.forEach((track, idx) => {
      const item = document.createElement('div');
      item.className = `track-item ${idx === currentTrackIndex ? 'active' : ''}`;
      item.innerHTML = `
        <div class="track-num">${idx + 1}</div>
        <img src="${track.cover}" alt="Cover" class="track-thumb">
        <div class="track-details">
          <div class="track-item-title">${track.title}</div>
          <div class="track-item-sub">${track.artist}</div>
        </div>
        <div class="track-duration">${track.duration}</div>
      `;

      item.addEventListener('click', () => {
        loadTrack(idx);
        playAudio();
        closeModal(modalPlaylist);
      });

      trackListContainer.appendChild(item);
    });
  }

  function updatePlaylistActiveState() {
    const items = trackListContainer.querySelectorAll('.track-item');
    items.forEach((item, idx) => {
      if (idx === currentTrackIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  playlistSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filteredTracks = TRACKS.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.artist.toLowerCase().includes(query)
    );
    renderPlaylist();
  });

  // Route category chips
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const cat = chip.dataset.category;
      activeCategory = cat;

      if (cat === 'all') {
        filteredTracks = [...TRACKS];
      } else {
        filteredTracks = TRACKS.filter(t => t.category === cat);
      }

      loadTrack(0);
      renderPlaylist();
      if (isPlaying) playAudio();
    });
  });

  // Modals
  function openModal(modal) {
    modal.classList.add('active');
  }

  function closeModal(modal) {
    modal.classList.remove('active');
  }

  btnOpenPlaylist.addEventListener('click', () => {
    renderPlaylist();
    openModal(modalPlaylist);
  });
  closePlaylist.addEventListener('click', () => closeModal(modalPlaylist));
  modalPlaylist.addEventListener('click', (e) => {
    if (e.target === modalPlaylist) closeModal(modalPlaylist);
  });

  // Vintage Bus Ticket Modal
  btnOpenTicket.addEventListener('click', () => {
    const track = filteredTracks[currentTrackIndex] || TRACKS[0];
    tktSong.textContent = track.title;
    tktArtist.textContent = track.artist;
    tktNumber.textContent = 'UP-90S-' + Math.floor(1000 + Math.random() * 9000);

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    tktDate.textContent = dateStr;

    openModal(modalTicket);
  });

  closeTicket.addEventListener('click', () => closeModal(modalTicket));
  modalTicket.addEventListener('click', (e) => {
    if (e.target === modalTicket) closeModal(modalTicket);
  });

  btnCopyTicket.addEventListener('click', () => {
    const track = filteredTracks[currentTrackIndex] || TRACKS[0];
    const text = `🚌 Listening to "${track.title}" by ${track.artist} on UP BUS! Join the journey: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      btnCopyTicket.textContent = '✅ Copied!';
      setTimeout(() => {
        btnCopyTicket.textContent = '📋 Copy Song Link';
      }, 2000);
    });
  });

  // Dynamic Passenger Counter Simulation
  setInterval(() => {
    const current = parseInt(passengerCountEl.textContent, 10);
    const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const nextVal = Math.max(38, Math.min(68, current + delta));
    passengerCountEl.textContent = nextVal;
  }, 10000);

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.code === 'ArrowLeft') {
      prevTrack();
    } else if (e.code === 'ArrowRight') {
      nextTrack();
    }
  });

  // Event Listeners
  btnPlay.addEventListener('click', togglePlay);
  btnPrev.addEventListener('click', prevTrack);
  btnNext.addEventListener('click', nextTrack);
  btnEngineAmbient.addEventListener('click', toggleEngineAmbient);
  btnRainAmbient.addEventListener('click', toggleRainAmbient);

  // ==========================================
  // 5. Canvas Night Highway Drive Visualizer
  // ==========================================
  const canvas = document.getElementById('highway-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Highway Particle Streaks & Streetlamps
  const lamps = [];
  for (let i = 0; i < 25; i++) {
    lamps.push({
      x: (Math.random() - 0.5) * 2000,
      y: Math.random() * 800 - 400,
      z: Math.random() * 1000,
      side: Math.random() > 0.5 ? 1 : -1
    });
  }

  const stars = [];
  for (let i = 0; i < 90; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * (height * 0.5),
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2
    });
  }

  function drawCanvas() {
    ctx.clearRect(0, 0, width, height);

    // Draw Horizon & Sky Gradient
    const horizonY = height * 0.55;
    const skyGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGradient.addColorStop(0, '#04060a');
    skyGradient.addColorStop(1, '#0e1422');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, horizonY);

    // Draw Stars
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Draw Road Surface Gradient
    const roadGradient = ctx.createLinearGradient(0, horizonY, 0, height);
    roadGradient.addColorStop(0, '#090d16');
    roadGradient.addColorStop(1, '#04060a');
    ctx.fillStyle = roadGradient;
    ctx.fillRect(0, horizonY, width, height - horizonY);

    // Vanishing Point Road Perspective Lines
    const cx = width / 2;
    const roadWidthFar = 30;
    const roadWidthNear = width * 0.85;

    // Road Border Lines
    ctx.strokeStyle = 'rgba(255, 107, 43, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - roadWidthFar, horizonY);
    ctx.lineTo(cx - roadWidthNear, height);
    ctx.moveTo(cx + roadWidthFar, horizonY);
    ctx.lineTo(cx + roadWidthNear, height);
    ctx.stroke();

    // Center Dashed Yellow Line
    ctx.strokeStyle = 'rgba(255, 184, 0, 0.6)';
    ctx.lineWidth = 4;
    ctx.setLineDash([20, 25]);
    ctx.lineDashOffset = -performance.now() * 0.08;
    ctx.beginPath();
    ctx.moveTo(cx, horizonY);
    ctx.lineTo(cx, height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Moving Highway Street Lamps & Headlights
    const speed = isPlaying ? 3.5 : 1.2;
    lamps.forEach(lamp => {
      lamp.z -= speed;
      if (lamp.z <= 1) {
        lamp.z = 1000;
        lamp.x = (Math.random() - 0.5) * 2000;
      }

      const k = 300 / lamp.z;
      const px = cx + (lamp.side * (roadWidthFar + 40) + lamp.x * 0.1) * k;
      const py = horizonY + (120 - lamp.y * 0.1) * k;
      const radius = Math.max(1, 14 * k);

      if (py > horizonY && py < height && px > 0 && px < width) {
        const glow = ctx.createRadialGradient(px, py, 0, px, py, radius * 3);
        glow.addColorStop(0, 'rgba(255, 184, 0, 0.8)');
        glow.addColorStop(0.5, 'rgba(255, 107, 43, 0.25)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    requestAnimationFrame(drawCanvas);
  }

  // Initialize
  loadTrack(0);
  renderPlaylist();
  drawCanvas();

})();
