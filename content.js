new MutationObserver(() => {
  onDOMChange();
}).observe(document, { subtree: true, childList: true });

function onDOMChange() {
  beginCleanup(true);
}

const beginCleanup = () => {
  console.log('Beginning cleanup');
  removeWhoToFollow();
  removeHappening();
};

const removeWhoToFollow = () => {
  // span > div > h2 > div > aside > div
  const span = $("span:contains('Who to follow')");
  const div1 = span.parent('div');
  const h2 = div1.parent('h2');
  const div2 = h2.parent('div');
  const aside = div2.parent('aside');
  const div3 = aside.parent('div');

  // console.log(span);
  // console.log(div1);
  // console.log(h2);
  // console.log(div2);
  // console.log(aside);
  // console.log(div3);

  div3.remove();
};

const removeHappening = () => {
  // span > div > h2 > div > div > div > div

  const span = $("span:contains('What’s happening')");
  const div1 = span.parent('div');
  const h2 = div1.parent('h2');
  const div2 = h2.parent('div');
  const div3 = div2.parent('div');
  const div4 = div3.parent('div');
  const div5 = div4.parent('div');

  // console.log(span);
  // console.log(div1);
  // console.log(h2);
  // console.log(div2);
  // console.log(div3);
  // console.log(div4);
  // console.log(div5);

  div5.remove();
};

document.onload = beginCleanup();
