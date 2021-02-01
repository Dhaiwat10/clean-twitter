new MutationObserver(() => {
  onDOMChange();
}).observe(document, { subtree: true, childList: true });

function onDOMChange() {
  beginCleanup(true);
}

const checkIfNumber = val => {
  let isNum = /^\d+$/.test(val);
  return isNum;
};

const beginCleanup = () => {
  // console.log('Beginning cleanup');
  removeSection(['div', 'h2', 'div', 'aside', 'div'], 'Who to follow');
  removeSection(['div', 'h2', 'div', 'div', 'div', 'div'], 'What’s happening');
  removeSection(['div', 'h2', 'div', 'aside', 'div'], 'You might like');
  removeSection(['div', 'h2', 'div', 'aside', 'div'], 'Relevant people');

  removeNumbers();

  removeFooter();
};

const removeSection = (treeStructure, targetText) => {
  const span = $(`span:contains('${targetText}')`);

  let iterator = span;

  // console.log('Itr before loop', iterator);

  for (let el of treeStructure) {
    iterator = iterator.parent(el);
  }

  // console.log('Itr after loop completion', iterator);

  iterator.remove();
};

const removeNumbers = () => {
  const likesEl = $(
    '.css-901oao, .css-16my406, .r-poiln3, .r-bcqeeo, .r-qvutc0'
  );

  for (let item of likesEl) {
    const { nodeName: tag } = item;

    if (tag === 'SPAN') {
      const innerText = $(item).html();

      if (checkIfNumber(innerText)) {
        // TODO: Also handle numbers with suffixes like K, M (eg. 100k, 1M)
        item.remove();
      }
    }
  }
};

const removeFooter = () => {
  const navElement = $('[aria-label=Footer]');

  navElement.remove();
};

document.onload = beginCleanup();
