// Music Player
const playlist = [
    {
        title: 'Summer Vibes',
        artist: 'Chill Beats',
        duration: '3:45',
        emoji: '🌴'
    },
    {
        title: 'Night Drive',
        artist: 'Synthwave',
        duration: '4:12',
        emoji: '🌃'
    },
    {
        title: 'Morning Coffee',
        artist: 'Acoustic',
        duration: '3:28',
        emoji: '☕'
    },
    {
        title: 'Energy Boost',
        artist: 'Electronic',
        duration: '3:55',
        emoji: '⚡'
    },
    {
        title: 'Relaxation',
        artist: 'Ambient',
        duration: '5:20',
        emoji: '🧘'
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let currentTime = 0;
let totalDuration = 225; // in seconds (3:45)

// DOM Elements
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumImage = document.getElementById('album-image');
const progress = document.getElementById('progress');
const progressHandle = document.getElementById('progress-handle');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const playlistItems = document.getElementById('playlist-items');
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');

// Initialize
function init() {
    renderPlaylist();
    loadSong(currentSongIndex);
    
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);
    
    progressBar.addEventListener('click', seek);
    volumeSlider.addEventListener('input', updateVolume);
    
    // Simulate playback
    setInterval(updateProgress, 1000);
}

// Render Playlist
function renderPlaylist() {
    playlistItems.innerHTML = playlist.map((song, index) => `
        <div class="playlist-item ${index === currentSongIndex ? 'active' : ''}" onclick="loadSong(${index})">
            <div class="playlist-item-icon">${song.emoji}</div>
            <div class="playlist-item-info">
                <div class="playlist-item-title">${song.title}</div>
                <div class="playlist-item-artist">${song.artist}</div>
            </div>
            <div class="playlist-item-duration">${song.duration}</div>
        </div>
    `).join('');
}

// Load Song
function loadSong(index) {
    currentSongIndex = index;
    const song = playlist[index];
    
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    
    // Update duration
    const [minutes, seconds] = song.duration.split(':');
    totalDuration = parseInt(minutes) * 60 + parseInt(seconds);
    totalTimeEl.textContent = song.duration;
    
    // Reset progress
    currentTime = 0;
    updateProgress();
    
    // Update playlist active state
    renderPlaylist();
    
    // Start playing if was playing
    if (isPlaying) {
        albumImage.classList.add('playing');
    } else {
        albumImage.classList.remove('playing');
    }
}

// Toggle Play/Pause
function togglePlayPause() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        albumImage.classList.add('playing');
    } else {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        albumImage.classList.remove('playing');
    }
}

// Play Previous
function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    if (!isPlaying) {
        togglePlayPause();
    }
}

// Play Next
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    if (!isPlaying) {
        togglePlayPause();
    }
}

// Update Progress
function updateProgress() {
    if (isPlaying && currentTime < totalDuration) {
        currentTime += 1;
    } else if (currentTime >= totalDuration) {
        // Auto play next song
        playNext();
        return;
    }
    
    const progressPercent = (currentTime / totalDuration) * 100;
    progress.style.width = `${progressPercent}%`;
    progressHandle.style.left = `${progressPercent}%`;
    
    // Update time display
    currentTimeEl.textContent = formatTime(currentTime);
}

// Seek
function seek(e) {
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    const newTime = (percent / 100) * totalDuration;
    
    currentTime = Math.max(0, Math.min(newTime, totalDuration));
    updateProgress();
}

// Update Volume
function updateVolume() {
    const volume = volumeSlider.value;
    volumeValue.textContent = `${volume}%`;
}

// Format Time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Make loadSong global
window.loadSong = loadSong;

// Initialize
init();

