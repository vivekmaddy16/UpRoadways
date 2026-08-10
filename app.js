/* ==========================================================================
   UP ROADWAYS (UpBusPlay) - Native YouTube Playlist Audio Engine
   Loads user's exact playlist (PLeatb7hupNV_AWUl_7ttbsKeCQh8tF5N4)
   ========================================================================== */

(function () {
  'use strict';

  // 1. Bus Driver ki Playlist Database
  const TRACKS = [
  {
    "id": 1,
    "title": "Mujhse Mohabbat Ka Izhaar",
    "artist": "Shemaroo Filmi Gaane",
    "duration": "5:04",
    "ytId": "N0jnLZxYwYc",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    "id": 2,
    "title": "Tumsa Koi Pyaara",
    "artist": "Tips Official",
    "duration": "6:16",
    "ytId": "3NWMK2MRqIk",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    "id": 3,
    "title": "Waada Raha Sanam -4K",
    "artist": "Ishtar Music",
    "duration": "6:05",
    "ytId": "9b0iydtDZLU",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    "id": 4,
    "title": "Chhupana Bhi Nahin Aata",
    "artist": "Venus Movies",
    "duration": "4:13",
    "ytId": "fg9G1dacXjk",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    "id": 5,
    "title": "Jhanjharia Lyrical (Male)",
    "artist": "Tips Official",
    "duration": "5:09",
    "ytId": "u0AgbGWvzdA",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    "id": 6,
    "title": "Husn Hai Suhana",
    "artist": "Tips Official",
    "duration": "5:48",
    "ytId": "jE1CavSI5TQ",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    "id": 7,
    "title": "Jeeye To Jeeye Kaise -Lyrical",
    "artist": "Ishtar Music",
    "duration": "3:37",
    "ytId": "wYdXuNtJkPk",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    "id": 8,
    "title": "Pehli Pehli Baar Mohabbat Ki Hai",
    "artist": "T-Series Bollywood Classics",
    "duration": "7:37",
    "ytId": "cBGDDBHN22U",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  {
    "id": 9,
    "title": "Saaton Janam Main Tere Full Lyrical",
    "artist": "Ishtar Music",
    "duration": "6:02",
    "ytId": "oFxbBeYhLqM",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  },
  {
    "id": 10,
    "title": "To Chalun",
    "artist": "Roopkumar Rathod (Official)",
    "duration": "7:39",
    "ytId": "e-1xmmEb49I",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    "id": 11,
    "title": "Tumhein Dekhen Meri Aankhen",
    "artist": "Tips Official",
    "duration": "6:34",
    "ytId": "7-ORLGKcnLQ",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    "id": 12,
    "title": "Lyrical: Tumhein Apna Banane Ki Kasam",
    "artist": "T-Series Bollywood Classics",
    "duration": "5:37",
    "ytId": "tPNwGuu_rQ4",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    "id": 13,
    "title": "Raah Mein Unse Mulaqat - Lyrical",
    "artist": "Tips Official",
    "duration": "7:36",
    "ytId": "dDR4oiyjUBA",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    "id": 14,
    "title": "Tu Jo Hans Hans Ke HD",
    "artist": "Goldmines Gaane Sune Ansune",
    "duration": "4:14",
    "ytId": "tRMzF4EVPHI",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    "id": 15,
    "title": "Kahin mujhe pyar hua to nahin hai",
    "artist": "SADABAHAR HITS",
    "duration": "7:04",
    "ytId": "2nypvYilIkA",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    "id": 16,
    "title": "Dil Kehta Hai",
    "artist": "Ishtar Music",
    "duration": "6:43",
    "ytId": "PqiddY3o3aY",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    "id": 17,
    "title": "Ae Kash Ke Hum Full Video - Kabhi Haan Kabhi Naa",
    "artist": "SonyMusicIndiaVEVO",
    "duration": "4:56",
    "ytId": "Jtg2zyS_y_c",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    "id": 18,
    "title": "Sochenge Tumhe Pyar- Lyrical",
    "artist": "Ishtar Music",
    "duration": "6:30",
    "ytId": "lFdSi01tpYM",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  {
    "id": 19,
    "title": "Kumar Sanu & Sadhana Sargam Live Sydney",
    "artist": "Chintan Ramola",
    "duration": "2:59",
    "ytId": "i1IsLVz6T9Q",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  },
  {
    "id": 20,
    "title": "Woh Meri Neend Mera Chain Lyrical - Hum Hain Rahi Pyar Ke",
    "artist": "Tips Official",
    "duration": "4:57",
    "ytId": "bga_0ziOOfQ",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    "id": 21,
    "title": "Dil Hai Ki Manta Nahin Full Audio Song (Female Version)",
    "artist": "T-Series Bollywood Classics",
    "duration": "6:11",
    "ytId": "g3ddCx2Uawo",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    "id": 22,
    "title": "Chori Chori Dil Tera",
    "artist": "Shemaroo Filmi Gaane",
    "duration": "6:53",
    "ytId": "QjqKXFGM3eI",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    "id": 23,
    "title": "Is Tarah Aashiqui Ka Lyrical",
    "artist": "Tips Official",
    "duration": "7:49",
    "ytId": "Y-o8NQ8Y36A",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    "id": 24,
    "title": "Kitna Haseen Chehra Full Lyrical Video Song",
    "artist": "Ishtar Music",
    "duration": "6:05",
    "ytId": "qGOTe3KmCdY",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    "id": 25,
    "title": "Dil Cheer Ke Dekh",
    "artist": "Tips Official",
    "duration": "4:47",
    "ytId": "9f6GhUb-WdM",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    "id": 26,
    "title": "Pucho Zara Pucho",
    "artist": "Tips Official",
    "duration": "7:40",
    "ytId": "E4HtYArLiwc",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    "id": 27,
    "title": "Woh Ladki Bahut Yaad Aati Hai - Kumar Sanu",
    "artist": "Madhur Sangeet",
    "duration": "7:30",
    "ytId": "d5ZrSe1eDDU",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    "id": 28,
    "title": "Lal Dupatta",
    "artist": "T-Series",
    "duration": "4:59",
    "ytId": "1jjDs69WWUQ",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  {
    "id": 29,
    "title": "Sona Kitna Sona Hai",
    "artist": "Tips Official",
    "duration": "4:39",
    "ytId": "PlN6oP-Nlno",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  },
  {
    "id": 30,
    "title": "Humko Deewana Kar Gaye [] Humko Deewana Kar Gaye",
    "artist": "T-Series",
    "duration": "6:23",
    "ytId": "SF_cCyz6QQg",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    "id": 31,
    "title": "Aisi Deewangi - Lyrical Video",
    "artist": "Ishtar Music",
    "duration": "7:26",
    "ytId": "_YjSmLlmqLM",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    "id": 32,
    "title": "आते जाते खूबसूरत आवारा सड़को पे Aate Jate Khoobsurat Awara",
    "artist": "Gaane Naye Purane",
    "duration": "5:15",
    "ytId": "qkZiKkmaBtE",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    "id": 33,
    "title": "Neele Neele Ambar Par",
    "artist": "SonyMusicIndiaVEVO",
    "duration": "3:55",
    "ytId": "eVnG_Rqfgg4",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    "id": 34,
    "title": "Is Pyar Se Meri Taraf Na Dekho - Lyrical",
    "artist": "Tips Official",
    "duration": "5:10",
    "ytId": "mW4WRtL6GxM",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    "id": 35,
    "title": "Hum Lakh Chupaye Pyar Magar",
    "artist": "Ultra Bollywood",
    "duration": "4:37",
    "ytId": "wuLJtA0uJro",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    "id": 36,
    "title": "Hum Yaar Hai Tumhare",
    "artist": "Bollywood Sadabahar",
    "duration": "7:11",
    "ytId": "uIOrAkrjwp4",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    "id": 37,
    "title": "Tumse Milne Ko Dil Karta Hai ❤️🎶",
    "artist": "Zee Music Classic",
    "duration": "4:39",
    "ytId": "5y_TCKNzAMI",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    "id": 38,
    "title": "Ab Tere Dil Mein To",
    "artist": "Likable Songs",
    "duration": "8:25",
    "ytId": "cBwl6qKrZd0",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  {
    "id": 39,
    "title": "Dil Ka Aalam ()",
    "artist": "T-Series",
    "duration": "4:15",
    "ytId": "BaAoZA0fup0",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  },
  {
    "id": 40,
    "title": "Oye Raju Pyar Na Kariyo Lyrical Video",
    "artist": "T-Series Bollywood Classics",
    "duration": "5:53",
    "ytId": "nNhv8A_rJTg",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    "id": 41,
    "title": "Jaa Bewafa Jaa  - Altaf Raja",
    "artist": "Ishtar Music",
    "duration": "4:29",
    "ytId": "s1NLjpj3aP4",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    "id": 42,
    "title": "Muje Pine ka Shauk Nahi - Coolie (1983)  *HD*",
    "artist": "Bolly HD Songs",
    "duration": "4:47",
    "ytId": "u4NSsEIny1c",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    "id": 43,
    "title": "Nahin Yeh Ho Nahin Sakta -Lyrical",
    "artist": "Tips Official",
    "duration": "6:22",
    "ytId": "RjJxWRFfG3s",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    "id": 44,
    "title": "Barsaat Ke Mausam Mein",
    "artist": "Bollywood Hits",
    "duration": "5:26",
    "ytId": "rrzSZ0NMID4",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    "id": 45,
    "title": "Meri Mehbooba Lyrical - Pardes",
    "artist": "Tips Official",
    "duration": "7:29",
    "ytId": "1ziaNhD9xqE",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    "id": 46,
    "title": "Ae Mere Humsafar - 4K Video",
    "artist": "Ishtar Music",
    "duration": "6:42",
    "ytId": "UCsW7nea7sI",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    "id": 47,
    "title": "Aapke Pyaar Mein (From \"Raaz\") [Alka Yagnik]",
    "artist": "All Types Bollywood song Academy",
    "duration": "5:35",
    "ytId": "OTT_aW2SP74",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    "id": 48,
    "title": "Tere Dar Par Sanam",
    "artist": "Zee Music Classic",
    "duration": "6:29",
    "ytId": "5dWbn_qER3s",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  {
    "id": 49,
    "title": "S. P. Balasubrahmanyam sings Tumse Milne Ki Tamanna Hai - तुमसे मिलने की तमन्ना from Saajan (1991)",
    "artist": "Hemantkumar Mahale",
    "duration": "5:47",
    "ytId": "HIr_kpG4Fnc",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  },
  {
    "id": 50,
    "title": "Taaron Ka Chamakta [] Hum Tumhare Hain Sanam",
    "artist": "T-Series",
    "duration": "6:01",
    "ytId": "XR7qvTgQ19o",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    "id": 51,
    "title": "Dono Hi Mohabbat Ke",
    "artist": "Ishtar Music",
    "duration": "8:55",
    "ytId": "jEL02Nz7Dds",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    "id": 52,
    "title": "Ding Dong Dole Lyrical Video",
    "artist": "T-Series Bollywood Classics",
    "duration": "6:43",
    "ytId": "mocKoIhNJxk",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    "id": 53,
    "title": "Dheere Dheere [] Tere Bina",
    "artist": "T-Series",
    "duration": "4:32",
    "ytId": "Tx7YCSTJC6I",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    "id": 54,
    "title": "Kumar Sanu",
    "artist": "Shemaroo Filmi Gaane",
    "duration": "6:13",
    "ytId": "jD3SGW0NHY0",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    "id": 55,
    "title": "Wafa Na Raas Aayee Tujhe O Harjaee Full Video",
    "artist": "T-Series",
    "duration": "6:06",
    "ytId": "0A2ue4lNMzo",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    "id": 56,
    "title": "Tere Dar Par Sanam",
    "artist": "Zee Music Classic",
    "duration": "6:29",
    "ytId": "5dWbn_qER3s",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    "id": 57,
    "title": "O Dil Tod Ke Hansti Ho Mera Remix Video Song",
    "artist": "Pop Chartbusters",
    "duration": "4:40",
    "ytId": "s4slgbuwOfw",
    "cover": "assets/up_bus_cover.png",
    "src": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  }
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

    audio.src = track.src;

    if (isYtReady && ytPlayer && typeof ytPlayer.playVideoAt === 'function') {
      try {
        ytPlayer.playVideoAt(currentIdx);
      } catch (e) {}
    }

    if (autoPlay || isPlaying) {
      playAudio();
    }

    renderPlaylistItems();
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
        audio.play().catch(() => {
          startSynthMelody();
        });
      }
    }, 450);
  }

  function pauseAudio() {
    if (isYtReady && ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
      try { ytPlayer.pauseVideo(); } catch (e) {}
    }
    audio.pause();
    stopSynthMelody();
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
