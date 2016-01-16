require('./git-config.js');
require('./fossasia-gci-website.js');
const jade = require('jade');
var Github = require('./scripts/github.js');
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

// listening to event if githubToken received
ipcRenderer.on('githubToken', function (event, token) {
  window.localStorage.githubToken = token;
  // remove the login with github button

  Github.requestUserData(token, function(data, err) {
    if (err) {  // Something went wrong
      console.error(err);
    }

    // Render the card with the user's info
    var html = jade.renderFile('github.jade', { github: data });
    document.getElementById('scroll-tab-3').innerHTML = html;

    // Update MDL to make table's tooltips work
    componentHandler.upgradeDom('MaterialTooltip', 'mdl-tooltip');
  });
});

document.getElementById('github-login-button').addEventListener('click', function(event) {
  event.preventDefault();

  ipcRenderer.send('getGithubToken');
});

// Event listeners for the drawer links

document.getElementById('nav1').addEventListener('click', function(event) {
  event.preventDefault();

  document.getElementById('scroll-tab-2').className = 'mdl-layout__tab-panel';
  document.getElementById('scroll-tab-3').className = 'mdl-layout__tab-panel';
  document.getElementById('scroll-tab-1').className += ' is-active';

  document.getElementById('drawer').className = 'mdl-layout__drawer';
  document.getElementsByClassName('mdl-layout__obfuscator')[0].className = 'mdl-layout__obfuscator';
});

document.getElementById('nav2').addEventListener('click', function(event) {
  event.preventDefault();

  document.getElementById('scroll-tab-1').className = 'mdl-layout__tab-panel';
  document.getElementById('scroll-tab-3').className = 'mdl-layout__tab-panel';
  document.getElementById('scroll-tab-2').className += ' is-active';

  document.getElementById('drawer').className = 'mdl-layout__drawer';
  document.getElementsByClassName('mdl-layout__obfuscator')[0].className = 'mdl-layout__obfuscator';
});

document.getElementById('nav3').addEventListener('click', function(event) {
  event.preventDefault();

  document.getElementById('scroll-tab-1').className = 'mdl-layout__tab-panel';
  document.getElementById('scroll-tab-2').className = 'mdl-layout__tab-panel';
  document.getElementById('scroll-tab-3').className += ' is-active';

  document.getElementById('drawer').className = 'mdl-layout__drawer';
  document.getElementsByClassName('mdl-layout__obfuscator')[0].className = 'mdl-layout__obfuscator';
});
