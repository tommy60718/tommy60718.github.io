document.addEventListener('DOMContentLoaded', function() {
  // Initialize the music player if we're on the music player page
  if (document.querySelector('.music-player-page')) {
    initMusicPlayer();
  }
  
  // Initialize other page-specific functionality
  if (document.querySelector('.blog-index')) {
    // Blog-specific JS could go here
  }
  
  // Handle Music Station navigation
  if (document.querySelector('.music-station-page')) {
    // Highlight active section
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.station-nav-item');
    
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (currentPath === href || currentPath.startsWith(href)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  
  // Dynamically load guitar-sheets.js if on guitar sheets page
  if (document.querySelector('.guitar-sheets-page')) {
    const script = document.createElement('script');
    script.src = '/assets/js/guitar-sheets.js';
    document.body.appendChild(script);
  }
});

function initMusicPlayer() {
  // Player elements
  const playButton = document.getElementById('play-button');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const volumeSlider = document.getElementById('volume-slider');
  const progressBar = document.getElementById('progress-bar');
  const progress = document.getElementById('progress');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const trackTitle = document.getElementById('track-title');
  const trackArtist = document.getElementById('track-artist');
  const trackArtwork = document.getElementById('track-artwork');
  const playlistEl = document.getElementById('playlist');
  const visualizationCanvas = document.getElementById('visualization-canvas');
  const moodButtons = document.querySelectorAll('.mood-button');
  
  // Create audio element
  const audio = new Audio();
  let isPlaying = false;
  let currentTrackIndex = 0;
  let currentMood = 'calm';
  
  // Sample playlist - in a real app, this might come from an API or local storage
  const playlist = [
    {
      title: 'Peaceful Waters',
      artist: 'Nature Sounds',
      src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_03_-_Contention.mp3',
      artwork: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      mood: 'calm'
    },
    {
      title: 'Urban Rhythm',
      artist: 'City Beats',
      src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_04_-_Sentinel.mp3',
      artwork: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      mood: 'energetic'
    },
    {
      title: 'Deep Concentration',
      artist: 'Mind Waves',
      src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3',
      artwork: 'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      mood: 'focus'
    }
  ];
  
  // Generate playlist HTML
  function generatePlaylist() {
    playlistEl.innerHTML = '';
    playlist.forEach((track, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'playlist-item';
      if (index === currentTrackIndex) {
        listItem.classList.add('active');
      }
      
      listItem.innerHTML = `
        <div class="playlist-item-info">
          <h3 class="playlist-item-title">${track.title}</h3>
          <p class="playlist-item-artist">${track.artist}</p>
        </div>
        <span class="playlist-item-mood">${track.mood}</span>
      `;
      
      listItem.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        playTrack();
      });
      
      playlistEl.appendChild(listItem);
    });
  }
  
  // Load track
  function loadTrack(index) {
    const track = playlist[index];
    
    // Update track info
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackArtwork.src = track.artwork;
    
    // Set audio source
    audio.src = track.src;
    audio.load();
    
    // Update playlist active item
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Set appropriate mood
    setMood(track.mood);
  }
  
  // Play track
  function playTrack() {
    audio.play();
    isPlaying = true;
    playButton.innerHTML = '<span class="icon">⏸️</span>';
    startVisualization();
  }
  
  // Pause track
  function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playButton.innerHTML = '<span class="icon">▶️</span>';
    stopVisualization();
  }
  
  // Previous track
  function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
  }
  
  // Next track
  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
  }
  
  // Set mood and change visualization
  function setMood(mood) {
    currentMood = mood;
    
    // Update active mood button
    moodButtons.forEach(button => {
      if (button.dataset.mood === mood) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    
    // Change visualization based on mood
    updateVisualization();
  }
  
  // Simple visualization based on mood
  let animationFrame;
  
  function startVisualization() {
    if (!visualizationCanvas) return;
    
    stopVisualization();
    updateVisualization();
  }
  
  function stopVisualization() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  }
  
  function updateVisualization() {
    // Canvas setup for visualization
    const canvas = document.createElement('canvas');
    visualizationCanvas.innerHTML = '';
    visualizationCanvas.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = visualizationCanvas.clientWidth;
    canvas.height = visualizationCanvas.clientHeight;
    
    // Different visualization styles based on mood
    let particleColor, bgColor, particleCount, particleSpeed;
    
    switch (currentMood) {
      case 'calm':
        bgColor = 'rgba(0, 50, 100, 0.2)';
        particleColor = 'rgba(100, 150, 255, 0.7)';
        particleCount = 30;
        particleSpeed = 0.5;
        break;
      case 'energetic':
        bgColor = 'rgba(100, 0, 0, 0.2)';
        particleColor = 'rgba(255, 100, 50, 0.7)';
        particleCount = 60;
        particleSpeed = 2;
        break;
      case 'focus':
        bgColor = 'rgba(0, 70, 0, 0.2)';
        particleColor = 'rgba(50, 200, 100, 0.7)';
        particleCount = 15;
        particleSpeed = 0.3;
        break;
      default:
        bgColor = 'rgba(0, 0, 0, 0.1)';
        particleColor = 'rgba(200, 200, 200, 0.7)';
        particleCount = 20;
        particleSpeed = 1;
    }
    
    // Create particles
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * particleSpeed,
        speedY: (Math.random() - 0.5) * particleSpeed
      });
    }
    
    // Animation function
    function animate() {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
      });
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // Format time in minutes and seconds
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  
  // Update progress bar and time display
  function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
  }
  
  // Set progress bar when clicked
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }
  
  // Event listeners
  playButton.addEventListener('click', () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  });
  
  prevButton.addEventListener('click', prevTrack);
  nextButton.addEventListener('click', nextTrack);
  
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
  });
  
  progressBar.addEventListener('click', setProgress);
  
  audio.addEventListener('timeupdate', updateProgress);
  
  audio.addEventListener('ended', nextTrack);
  
  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
  });
  
  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      setMood(button.dataset.mood);
    });
  });
  
  // Create mini player functionality
  function createMiniPlayer() {
    const miniPlayer = document.createElement('div');
    miniPlayer.className = 'mini-player';
    
    miniPlayer.innerHTML = `
      <div class="mini-player-artwork">
        <img id="mini-artwork" src="${playlist[0].artwork}" alt="Track Artwork">
      </div>
      <div class="mini-player-info">
        <h3 id="mini-title">${playlist[0].title}</h3>
        <p id="mini-artist">${playlist[0].artist}</p>
      </div>
      <div class="mini-player-controls">
        <button id="mini-prev-button" class="mini-player-button">⏮️</button>
        <button id="mini-play-button" class="mini-player-button">▶️</button>
        <button id="mini-next-button" class="mini-player-button">⏭️</button>
      </div>
    `;
    
    document.body.appendChild(miniPlayer);
    
    // Mini player elements
    const miniArtwork = document.getElementById('mini-artwork');
    const miniTitle = document.getElementById('mini-title');
    const miniArtist = document.getElementById('mini-artist');
    const miniPlayButton = document.getElementById('mini-play-button');
    const miniPrevButton = document.getElementById('mini-prev-button');
    const miniNextButton = document.getElementById('mini-next-button');
    
    // Mini player event listeners
    miniPlayButton.addEventListener('click', () => {
      if (isPlaying) {
        pauseTrack();
      } else {
        playTrack();
      }
    });
    
    miniPrevButton.addEventListener('click', prevTrack);
    miniNextButton.addEventListener('click', nextTrack);
    
    // Show mini player when scrolling down
    window.addEventListener('scroll', () => {
      const playerContainer = document.querySelector('.player-container');
      const playerRect = playerContainer.getBoundingClientRect();
      
      if (playerRect.bottom < 0) {
        miniPlayer.classList.add('visible');
      } else {
        miniPlayer.classList.remove('visible');
      }
    });
    
    // Update mini player info when track changes
    function updateMiniPlayer() {
      const track = playlist[currentTrackIndex];
      miniArtwork.src = track.artwork;
      miniTitle.textContent = track.title;
      miniArtist.textContent = track.artist;
      miniPlayButton.innerHTML = isPlaying ? '⏸️' : '▶️';
    }
    
    // Update mini player when track changes
    audio.addEventListener('play', updateMiniPlayer);
    audio.addEventListener('pause', updateMiniPlayer);
    
    return updateMiniPlayer;
  }
  
  const updateMiniPlayer = createMiniPlayer();
  
  // Initialize player
  generatePlaylist();
  loadTrack(currentTrackIndex);
  
  // Set initial volume
  audio.volume = volumeSlider.value / 100;
} 