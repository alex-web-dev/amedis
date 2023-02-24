window.addEventListener('load', () => {
  const $menu = document.querySelector('.menu');
  if ($menu) {
    const $menuToggle = $menu.querySelector('.menu__toggle');
    $menuToggle.addEventListener('click', () => {
      $menu.classList.toggle('menu--active');
    });

    const $links = $menu.querySelectorAll('.menu__link');
    $links.forEach($link => {
      $link.addEventListener('click', () => $menu.classList.remove('menu--active'));
    });
  }
});