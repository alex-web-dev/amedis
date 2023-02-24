const $tabsLists = document.querySelectorAll('.tabs');
$tabsLists.forEach($tabs => {
  const $btns = $tabs.querySelectorAll('.tabs__btn');
  $btns.forEach(($btn, index) => {
    $btn.addEventListener('click', () => {
      const $oldActiveBtn = $tabs.querySelector('.tabs__btn--active');
      const $oldActiveTab = $tabs.querySelector('.tabs__item--active');
      const $newActiveBtn = $tabs.querySelectorAll('.tabs__btn')[index];
      const $newActiveTab = $tabs.querySelectorAll('.tabs__item')[index];

      $oldActiveTab.classList.remove('tabs__item--active');
      $oldActiveBtn.classList.remove('tabs__btn--active');

      $newActiveBtn.classList.add('tabs__btn--active');
      $newActiveTab.classList.add('tabs__item--active');
    });
  });
});