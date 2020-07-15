let player;
const playerContainer = $('.player');
const volume = $('.player__volume');
const volumeNosound = volume.find('.volume__nosound');

let eventsInit = () => {
$('.player__start').on('click', (e) => {
   e.preventDefault();

   if (playerContainer.hasClass("paused")) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

$('.player__playback').click( e => {
   
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newBtnPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newBtnPositionPercent

    $('.player__playback-button').css({
        left: `${newBtnPositionPercent}%`
  });

  player.seekTo(newPlaybackPositionSec)

});

$('.player__splash').click( e => {
 player.playVideo();
});

$('.volume__icon').click(e => {
  e.preventDefault();

  if(volumeNosound.hasClass('volume__nosound--active')){
    player.unMute();
    volumeNosound.removeClass("volume__nosound--active");
  } else {
    player.mute();
    volumeNosound.addClass("volume__nosound--active");
  }
});

$(".volume__playback").click(e => {

  const barVolume = $(e.currentTarget);
  const clickedPositionVolume = e.originalEvent.layerX;
  const newVolumeButtonPositionPercent = (clickedPositionVolume / barVolume.width()) * 100;
  let volumePoint = player.getVolume();


  $(".volume__playback-button").css({
      left: `${newVolumeButtonPositionPercent}%`
  });

  player.setVolume(newVolumeButtonPositionPercent);
  
});
};

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);
    
    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);
    
    function addZero(num) {
      return num < 10 ? `0${num}` : num;
    }
    
    return `${minutes} : ${seconds}`;
   };



const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    $('.player__duration-estimate').text(formatTime(durationSec));
    if (typeof interval !== 'undefined') {
        clearInterval(interval);
    }
    interval = setInterval(() => {
       const completedSec = player.getCurrentTime();
       const completedPercent = (completedSec / durationSec)*100;

       $('.player__playback-button').css({
             left: `${completedPercent}%`
       });
       $('.player__duration-completed').text(formatTime(completedSec));
    }, 1000);
}

const onPlayerStateChange = event => {
/*
   -1 (воспроизведение видео не начато)
   0 (воспроизведение видео завершено)
   1 (воспроизведение)
   2 (пауза)
   3 (буферизация)
   5 (видео подают реплики)
*/

     switch (event.data) {
      case 1: 
      playerContainer.addClass('active');
      playerContainer.addClass("paused");
      break;

      case 2:
        playerContainer.removeClass('active');
        playerContainer.removeClass("paused");
      break;
     }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '405',
    width: '660',
    videoId: 'B7L-W8a4pvM',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },

    playerVars: {
        controls: 0,
        disabled: 0,
        rel: 0,
        autoplay: 0,
        showinfo: 0,
        modestbranding: 0
    }
  });
}

eventsInit();