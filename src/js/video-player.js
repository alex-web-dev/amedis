const videoPlayer = document.querySelector('.video-player');
if (videoPlayer) {
  const $btn = videoPlayer.querySelector('.video-player__btn');
  const $video = videoPlayer.querySelector('.video-player__video');
  const url = $video.dataset.src;
  
  $btn.addEventListener('click', () => {
    videoPlayer.classList.add('video-player--active');
    const $iframe = createYTFrame(url);
    $video.append($iframe);
  });
}

function createYTFrame(url) {
  const $iframe = document.createElement('iframe');
  $iframe.setAttribute('src', `${url}?autoplay=1`);
  $iframe.setAttribute('autoplay', '');
  $iframe.setAttribute('frameborder', '0');
  $iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  $iframe.setAttribute('allowfullscreen', '');

  return $iframe;
}