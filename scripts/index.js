const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

// listening to event if githubToken received
ipcRenderer.on("githubToken", function (event, token) {
  window.localStorage.githubToken = token

  // remove the login with github button
  document.getElementById("githubLoginBtn").textContent = "Logged In"
})



document.getElementById("githubLoginBtn").addEventListener("click", function (event) {
  // request a github token by sendinging getGithubToken message
  ipcRenderer.send("getGithubToken")
}, false)
