## Jira Links for Slack

Browser extension (content script) to facilitate the creation of Jira issue links for Slack.
Adds a button on Jira issue pages that copies the issue id and name (hyperlinked with the issue URL) to the clipboard, ready to paste in Slack.

### Installation instructions

- [Chrome](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/)
- [Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

### Configuring the matching URLs

The script is configured to match `*://jira.nuxeo.com/*` by default (in `manifest.json`), but it can be changed to match any other URL(s).