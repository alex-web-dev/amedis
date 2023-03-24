const $openBtns = document.querySelectorAll('.js-open-popup');
$openBtns.forEach($btn => {
  $btn.addEventListener('click', (e) => {
    const name = $btn.dataset.popupName;
    const extendClass = $btn.dataset.popupExtend;
    const $popup = document.querySelector(`.popup[data-name="${name}"]`);
    if (!name || !$popup) {
      return;
    }

    const $outerBtn = $btn.closest('.js-open-popup');
    if ($outerBtn) {
      e.stopPropagation();
    }

    if (extendClass && e.target.classList.contains(extendClass)) {
      return;
    }

    openPopup($popup);
  });
});

window.addEventListener('load', () => {
  const $popups = document.querySelectorAll('.popup');
  $popups.forEach($popup => {
    $popup.classList.add('popup--loaded');

    const $closeBtn = $popup.querySelector('.popup__close');
    $closeBtn.addEventListener('click', () => closePopup($popup));

    const $backdrop = $popup.querySelector('.popup__backdrop');
    $backdrop.addEventListener('click', () => closePopup($popup));
  });
});

function openPopup($popup) {
  $popup.classList.add('popup--show');
  document.body.classList.add('body--lock');
}

function closePopup($popup) {
  $popup.classList.remove('popup--show');

  const $otherOpenedPopup = document.querySelector('.popup--show');
  if (!$otherOpenedPopup) {
    document.body.classList.remove('body--lock');
  }
}