let no_sidebar = false;
let no_numbers = false;
let no_prompt = true;
let no_advertisment = true;
let showPlatform = false;

chrome.storage.local.get("noSidebar", (data) => {
  console.log("noSidebar", data.noSidebar);
  no_sidebar = data.noSidebar;
});

chrome.storage.local.get("noNumbers", (data) => {
  console.log("noNumbers", data.noNumbers);
  no_numbers = data.noNumbers;
});

chrome.storage.local.get("noPrompt", (data) => {
  console.log("noPrompt", data.noPrompt);
  no_prompt = data.noPrompt;
});

chrome.storage.local.get("noAdvertisment", (data) => {
  console.log("noAdvertisment", data.noAdvertisment);
  no_advertisment = data.noAdvertisment;
});

chrome.storage.local.get("showPlatform", (data) => {
  console.log("showPlatform", data.showPlatform);
  showPlatform = data.showPlatform;
});

const checkIfNumber = (val) => {
  let isNum = /^\d+$/.test(val);
  let isThousand = /^\d+(\.\d+)?K+$/.test(val);
  let isMillion = /^\d+(\.\d+)?M+$/.test(val);
  let hasComma = /^\d{1,3}(,\d{3})*(\.\d+)?$/.test(val);
  return isNum || isThousand || isMillion || hasComma;
};

const beginCleanup = (no_sidebar, no_numbers, no_prompt) => {
  // console.log('Beginning cleanup');

  var sideBar = document.querySelector('[aria-label="Trends"]');

  var innerSidebar = null;

  if (sideBar != null) {
    var sideBarChildren = sideBar.children;
    if (sideBarChildren != null && sideBarChildren.length >= 0) {
      innerSidebar = sideBarChildren.item(0);
    }
  }

  if (no_sidebar) {
    if (innerSidebar != null) {
      if (innerSidebar.children.length >= 3) {
        var relevantPeople = innerSidebar.children.item(2);

        if (relevantPeople != null) {
          var innerRelevantChildren = relevantPeople.children;

          if (
            innerRelevantChildren != null &&
            innerRelevantChildren.length >= 1
          ) {
            var innerRelevantChild = innerRelevantChildren.item(0);

            if (
              innerRelevantChild != null &&
              innerRelevantChild.tagName == "ASIDE"
            ) {
              relevantPeople.remove();
              deletedRelevantPeople = true;
            }
          }
        }
      }

      if (innerSidebar.children.length >= 4) {
        var relevantPeople = innerSidebar.children.item(3);

        if (relevantPeople != null) {
          var innerRelevantChildren = relevantPeople.children;

          if (
            innerRelevantChildren != null &&
            innerRelevantChildren.length >= 1
          ) {
            var innerRelevantChild = innerRelevantChildren.item(0);

            if (
              innerRelevantChild != null &&
              innerRelevantChild.tagName == "ASIDE"
            ) {
              relevantPeople.remove();
              deletedRelevantPeople = true;
            }
          }
        }
      }

      if (innerSidebar.children.length >= 3) {
        var trendsForYou = innerSidebar.children.item(2);

        if (trendsForYou != null) {
          var innertrendsForYouChildren = trendsForYou.children;

          if (
            innertrendsForYouChildren != null &&
            innertrendsForYouChildren.length >= 1
          ) {
            var innertrendsForYouChild = innertrendsForYouChildren.item(0);

            if (innertrendsForYouChild != null) {
              if (innertrendsForYouChild.children.length >= 1) {
                var innerTrendsForYouChild2 =
                  innertrendsForYouChild.children.item(0);
                if (
                  innerTrendsForYouChild2 != null &&
                  innerTrendsForYouChild2.tagName == "SECTION"
                ) {
                  trendsForYou.remove();
                }
              }
            }
          }
        }
      }

      if (innerSidebar.children.length >= 4) {
        var trendsForYou = innerSidebar.children.item(3);

        if (trendsForYou != null) {
          var innertrendsForYouChildren = trendsForYou.children;

          if (
            innertrendsForYouChildren != null &&
            innertrendsForYouChildren.length >= 1
          ) {
            var innertrendsForYouChild = innertrendsForYouChildren.item(0);

            if (innertrendsForYouChild != null) {
              if (innertrendsForYouChild.children.length >= 1) {
                var innerTrendsForYouChild2 =
                  innertrendsForYouChild.children.item(0);
                if (
                  innerTrendsForYouChild2 != null &&
                  innerTrendsForYouChild2.tagName == "SECTION"
                ) {
                  trendsForYou.remove();
                }
              }
            }
          }
        }
      }

      if (innerSidebar.children.length >= 5) {
        var trendsForYou = innerSidebar.children.item(4);

        if (trendsForYou != null) {
          var innertrendsForYouChildren = trendsForYou.children;

          if (
            innertrendsForYouChildren != null &&
            innertrendsForYouChildren.length >= 1
          ) {
            var innertrendsForYouChild = innertrendsForYouChildren.item(0);

            if (innertrendsForYouChild != null) {
              if (innertrendsForYouChild.children.length >= 1) {
                var innerTrendsForYouChild2 =
                  innertrendsForYouChild.children.item(0);
                if (
                  innerTrendsForYouChild2 != null &&
                  innerTrendsForYouChild2.tagName == "SECTION"
                ) {
                  trendsForYou.remove();
                }
              }
            }
          }
        }
      }

      if (innerSidebar.children.length > 0) {
        var copyrightNotice = innerSidebar.children.item(
          innerSidebar.children.length - 1
        );
        if (copyrightNotice != null) {
          if (copyrightNotice.children.length >= 1) {
            var innercopyright = copyrightNotice.children.item(0);
            if (innercopyright != null && innercopyright.tagName == "NAV") {
              copyrightNotice.remove();
            }
          }
        }
      }
    }

    removeFooter();
  }

  if (no_numbers) {
    removeNumbers();
  }

  if (no_prompt) {
    var layerDiv = document.getElementById("layers");

    if (layerDiv != null) {
      var loginBar = layerDiv.querySelector('[data-testid="BottomBar"]');

      if (loginBar != null) {
        loginBar.remove();
      }

      var loginPrompt = layerDiv.querySelector('[data-testid="sheetDialog"]');
      if (loginPrompt != null) {
        var loginPromptParent = loginPrompt.parentElement;
        if (loginPromptParent != null) {
          loginPromptParent.remove();
        }
      }
    }

    if (innerSidebar != null && innerSidebar.children.length >= 2) {
      var registerPrompt = innerSidebar.children.item(2);

      if (registerPrompt != null) {
        var innerChildren = registerPrompt.children;

        if (innerChildren != null && innerChildren.length >= 1) {
          var innerChild = innerChildren.item(0);

          if (innerChild != null && innerChild.tagName == "SECTION") {
            registerPrompt.remove();
          }
        }
      }
    }
    var htmlObject = document.querySelector("html");
    htmlObject.style.removeProperty("overflow");
    htmlObject.style.setProperty("overflow-y", "scroll");
    htmlObject.style.setProperty("overflow-behavior-y", "none");
  }

  if (no_advertisment) {
    var articleList = document.querySelectorAll(
      '[data-testid="placementTracking"]'
    );
    for (let index = 0; index < articleList.length; ++index) {
      var article = articleList.item(index);
      var articleChild = article.children;
      if (articleChild != null && articleChild.length >= 1) {
        var lastArticleChildDiv = articleChild.item(articleChild.length - 1);
        var lastArticleChildDivChildren = lastArticleChildDiv.children;
        if (
          lastArticleChildDivChildren != null &&
          lastArticleChildDivChildren.length >= 1
        ) {
          var articleElement = lastArticleChildDivChildren.item(0);
          if (
            articleElement != null &&
            articleElement.getAttribute("data-testid") === "tweet"
          ) {
            article.remove();
          }
        }
      }
    }
  }

  if (showPlatform) {
    let dateOnTweet = document.querySelector('[class="css-1dbjc4n r-1r5su4o"');

    if (dateOnTweet != null && dateOnTweet.childElementCount > 0) {
      let rightDiv = dateOnTweet.firstChild;
      if (rightDiv.childElementCount > 0) {
        rightDiv = rightDiv.firstChild;
        if (rightDiv.childElementCount == 1) {
          let platform = document.createElement('a');
          platform.id = 'CUSTOM-PLATFORM';
          platform.href = "https://ree6.de";
          platform.setAttribute('role', 'link')
          platform.classList.add('css-4rbku5', 'css-18t94o4', 'css-901oao', 'css-16my406');
          platform.setAttribute('style', 'color: rgb(29, 155, 240); margin-left: 5px;');
          rightDiv.appendChild(platform);
          retrievePlatform();
        }
      }
    }
  }
};

new MutationObserver(() => {
  onDOMChange();
}).observe(document, { subtree: true, childList: true });

function onDOMChange() {
  beginCleanup(no_sidebar, no_numbers, no_prompt);
}

document.onload = beginCleanup(no_sidebar, no_numbers, no_prompt);

var retrievePlatform = () => {
  chrome.runtime.sendMessage('get-auth', (response) => {
    var platform = document.getElementById('CUSTOM-PLATFORM');

    if (platform == null) return;
  
    const tweetUrl = window.location.href.split('/');
    const tweetId = tweetUrl[tweetUrl.length - 1];
    const url = `https://api.twitter.com/1.1/statuses/show.json?id=${tweetId}`;
  
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `${response}`
      }
    };
  
    const request = new XMLHttpRequest();
    request.open(options.method, url);
    request.setRequestHeader('Content-Type', options.headers['Content-Type']);
    request.setRequestHeader('Authorization', options.headers['Authorization']);
  
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        const tweetObject = JSON.parse(request.responseText)
        platform.text = tweetObject.source.split('>')[1].split('<')[0];
      } else {
       console.error(request.responseText);
      }
    };
  
    request.onerror = function() {
      console.error('An error occurred while making the request');
    };
  
    request.send();
  });
}

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
    ".css-901oao, .css-16my406, .r-poiln3, .r-bcqeeo, .r-qvutc0"
  );

  for (let item of likesEl) {
    const { nodeName: tag } = item;

    if (tag === "SPAN") {
      const innerText = $(item).html();

      if (checkIfNumber(innerText)) {
        // TODO: Also handle numbers with suffixes like K, M (eg. 100k, 1M)
        item.remove();
      }
    }
  }
};

const removeFooter = () => {
  const navElement = $("[aria-label=Footer]");

  navElement.remove();
};