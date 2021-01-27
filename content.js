new MutationObserver(() => {
  onDOMChange();
}).observe(document, { subtree: true, childList: true });

function onDOMChange() {
  beginCleanup(true);
}

const beginCleanup = () => {
  console.log('Beginning cleanup');
  removeSection(['div', 'h2', 'div', 'aside', 'div'], 'Who to follow');
  removeSection(['div', 'h2', 'div', 'div', 'div', 'div'], 'What’s happening');
  removeSection(['div', 'h2', 'div', 'aside', 'div'], 'You might like');
  removeSection(['div', 'h2', 'div', 'aside', 'div'], 'Relevant people');
  // removeSection([], 'Who to follow');
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

document.onload = beginCleanup();
