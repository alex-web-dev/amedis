export function moveElement(options) {
  const {
    element,
    from,
    to,
    width,
    fromInsertType = 'append',
    toInsertType = 'append'
  } = options;

  const $elem = document.querySelector(element);
  const $from = document.querySelector(from);
  const $to = document.querySelector(to);

  if (!$elem || !$from || !$to) {
    return;
  }

  setTimeout(() => {
    if (window.innerWidth <= width && $elem.parentNode === $from) {
      $to[toInsertType]($elem);
    } else if (window.innerWidth >= width && $elem.parentNode !== $from) {
      $from[fromInsertType]($elem);
    }
  });
}

export default {
  moveElement,
};