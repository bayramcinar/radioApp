var playButtons = document.querySelectorAll('.playButton');
var volumeBars = document.querySelectorAll('.volume-bar');
var volumeIcons = document.querySelectorAll('.volume');
var audioPlayers = document.querySelectorAll('audio');
var musicPlayer = document.querySelector('#musicPlayer');



audioPlayers.forEach(function(audioPlayer) {
  audioPlayer.controls = false;
});



playButtons.forEach(function(playButton, index) {
  playButton.addEventListener('click', function() {
    var currentAudioPlayer = audioPlayers[index];
    var currentAudioPlayerBefore = audioPlayers[index-1];
    var playIcon = playButton.querySelector('i');
    
    

    // Diğer ses çalarları durdur
    audioPlayers.forEach(function(audioPlayer, i) {
      if (audioPlayer !== currentAudioPlayer) {
        var otherPlayButton = playButtons[i];
        var otherPlayIcon = otherPlayButton.querySelector('i');
        audioPlayer.pause();
        otherPlayIcon.classList.remove('fa-pause');
        otherPlayIcon.classList.add('fa-play');
        var songs = document.querySelectorAll('audio'); // Şarkıları temsil eden öğelerin listesi

        songs.forEach(function(song) {
          if (song.classList.contains('active')) {
            song.classList.remove('active'); // Active class'ını kaldır
          }
        });
        
      }
    });

    if (currentAudioPlayer.paused) {
      musicPlayer.style.display = 'block';
      currentAudioPlayer.play();
      currentAudioPlayer.classList.add("active");
      playIcon.classList.remove('fa-play');
      playIcon.classList.add('fa-pause');
      var nameElement = currentAudioPlayer.querySelector("h5");
      var name = nameElement.innerHTML;
      var songTitle = document.querySelector('#musicPlayer .songTitle');
      songTitle.innerHTML = name;
      var imgElement = currentAudioPlayer.querySelector("img");
      var imgSrc = imgElement.getAttribute("src");
      var songImg = document.querySelector('#musicPlayer .songImg');
      songImg.setAttribute('src', imgSrc);
    } else {
      currentAudioPlayer.classList.remove("active");
      currentAudioPlayer.pause();
      playIcon.classList.remove('fa-pause');
      playIcon.classList.add('fa-play');
    }
  });
});

volumeBars.forEach(function(volumeBar, index) {
  var audioPlayer = audioPlayers[index];
  var volumeIcon = volumeIcons[index];

  volumeBar.addEventListener("input", function() {
    var volume = volumeBar.value / 100;
    audioPlayer.volume = volume;
    updateVolumeIcon(volumeIcon, volume);
  });

  volumeIcon.addEventListener("click", function() {
    if (audioPlayer.volume > 0) {
      audioPlayer.volume = 0;
      volumeBar.value = 0;
      updateVolumeIcon(volumeIcon, 0);
    } else {
      audioPlayer.volume = 1;
      volumeBar.value = 100;
      updateVolumeIcon(volumeIcon, 1);
    }
  });
});

function updateVolumeIcon(volumeIcon, volume) {
  if (volume > 0) {
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.add("fa-volume-high");
  } else {
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.add("fa-volume-xmark");
  }
}

function updateSongInfo(title) {
  var songTitle = document.querySelector('#musicPlayer .songTitle');
  songTitle.textContent = title;
}

var playPauseButton = document.getElementById("playPauseButton");
var playPauseIcon = playPauseButton.querySelector("i");
var volumeBarr = document.getElementById("volume-barr");
var volumee = document.getElementById("volumee");

playPauseButton.addEventListener("click", function() {
  var activeSong = document.querySelector("audio.active");

  if (activeSong) {
    if (activeSong.paused) {
      activeSong.play();
      playPauseIcon.classList = "fa-solid fa-pause";
    } else {
      activeSong.pause();
      playPauseIcon.classList = "fa-solid fa-play";
    }
  }
});


volumeBarr.addEventListener("input", function() {
    var activeSong = document.querySelector("audio.active");
    var volume = volumeBarr.value / 100;
    activeSong.volume = volume;
    updateVolumeIcon(volumee, volume);
  });

  volumee.addEventListener("click", function() {
    var activeSong = document.querySelector("audio.active");
    if (activeSong.volume > 0) {
      activeSong.volume = 0;
      volumeBarr.value = 0;
      updateVolumeIcon(volumee, 0);
    } else {
      activeSong.volume = 1;
      volumeBarr.value = 100;
      updateVolumeIcon(volumee, 1);
    }
  });


function updateVolumeIcon(volumeIcon, volume) {
  if (volume > 0) {
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.add("fa-volume-high");
  } else {
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.add("fa-volume-xmark");
  }
}
