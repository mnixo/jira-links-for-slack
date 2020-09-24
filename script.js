var buttonAnchor = document.createElement('a');
buttonAnchor.className = 'aui-button toolbar-trigger';
buttonAnchor.title = 'Copy hyperlinked text for Slack';
buttonAnchor.innerHTML = `
  <img
    src="https://raw.githubusercontent.com/mnixo/jira-links-for-slack/master/slack.svg" 
    style="vertical-align: sub;"
  ></img>
`;
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
  var opsBarDiv = document.querySelector('div[id="opsbar-jira.issue.tools"]');
  if (opsBarDiv) {
    opsBarDiv.insertBefore(buttonAnchor, opsBarDiv.children[0]);
  } else {
    console.error('Could not append the button.');
  }
};
