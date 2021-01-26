let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, { subtree: true, childList: true });

function onUrlChange() {
  beginCleanup();
}

const beginCleanup = () => {
  console.log('Beginning cleanup');

  setTimeout(() => {
    removeWhoToFollow();
  }, 2000);
};

const removeWhoToFollow = () => {
  // span > div > h2 > div > aside > div
  const span = $("span:contains('Who to follow')");
  const div1 = span.parent('div');
  const h2 = div1.parent('h2');
  const div2 = h2.parent('div');
  const aside = div2.parent('aside');
  const div3 = aside.parent('div');

  console.log(span);
  console.log(div1);
  console.log(h2);
  console.log(div2);
  console.log(aside);
  console.log(div3);

  div3.remove();
};

const removeHappening = () => {};

document.onload = beginCleanup();
