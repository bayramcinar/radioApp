var playButtons = document.querySelectorAll('.playButton');
var volumeBars = document.querySelectorAll('.volume-bar');
var volumeIcons = document.querySelectorAll('.volume');
var audioPlayers = document.querySelectorAll('audio');

audioPlayers.forEach(function(audioPlayer) {
  audioPlayer.controls = false;
});

playButtons.forEach(function(playButton, index) {
  playButton.addEventListener('click', function() {
    var currentAudioPlayer = audioPlayers[index];
    var playIcon = playButton.querySelector('i');

    // Diğer ses çalarları durdur
    audioPlayers.forEach(function(audioPlayer, i) {
      if (audioPlayer !== currentAudioPlayer) {
        var otherPlayButton = playButtons[i];
        var otherPlayIcon = otherPlayButton.querySelector('i');
        audioPlayer.pause();
        otherPlayIcon.classList.remove('fa-pause');
        otherPlayIcon.classList.add('fa-play');
      }
    });

    if (currentAudioPlayer.paused) {
      currentAudioPlayer.play();
      playIcon.classList.remove('fa-play');
      playIcon.classList.add('fa-pause');
    } else {
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