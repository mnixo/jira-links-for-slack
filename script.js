var buttonAnchor = document.createElement('a');
buttonAnchor.classList.add('aui-button');
buttonAnchor.classList.add('toolbar-trigger');
buttonAnchor.innerHTML = `<svg width="16" height="16" class="c-nav--footer__svgicon c-slackhash" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg" style="margin-top: 2px;"><g fill="none" fill-rule="evenodd"><path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0"></path><path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D"></path><path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ECB22E"></path><path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A"></path></g></svg>`;
buttonAnchor.title = 'Copy hyperlinked text for Slack';
buttonAnchor.onclick = () => {
  // create a temporary anchor and add it to the body
  var issueId = document.querySelector('a[class="issue-link"]');
  var issueTitle = document.querySelector('h1[id="summary-val"]');
  var tempAnchor = document.createElement('a');
  tempAnchor.href = issueId.href;
  tempAnchor.innerText = `${issueId.innerText}: ${issueTitle.innerText}`;
  document.body.appendChild(tempAnchor);
  // select and copy the text in the anchor
  var selection = window.getSelection();
  var range = document.createRange();
  range.selectNodeContents(tempAnchor);
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("Copy");
  // remove the anchor from the body
  document.body.removeChild(tempAnchor);
};

var observer = new MutationObserver(mutations => {
  // whenever there's a mutation, update the button
  mutations.forEach(() => updateButton());
});

observer.observe(document.body, { childList: true });

var updateButton = () => {
  // remove the button from its parent
  if (buttonAnchor.parentElement) {
    buttonAnchor.parentElement.removeChild(buttonAnchor);
  }
  // add the button to the toolbar
  var primaryToolbarDiv = document.querySelector('div[class="aui-toolbar2-primary"]');
  if (primaryToolbarDiv) {
    primaryToolbarDiv.appendChild(buttonAnchor);
  } else {
    console.error('Could not append the button.');
  }
};
