var currentTab;

function setup(info) {

    currentTab = info;
    
    document.getElementById("playButton").addEventListener("click", setupPlayDelay);
    document.getElementById("pauseButton").addEventListener("click", setupPauseDelay);
}

function setupPlayDelay(){
    var sleepTime = getSleepTimeMS();

    chrome.tabs.executeScript(currentTab.id, {
        code: 'var sleepTime = ' + sleepTime + ';'
    }, function() {
        chrome.tabs.executeScript(currentTab.id, {file: "play_content_script.js"});
    });

}

function setupPauseDelay() {
    var sleepTime = getSleepTimeMS();

    chrome.tabs.executeScript(currentTab.id, {
        code: 'var sleepTime = ' + sleepTime + ';'
    }, function() {
        chrome.tabs.executeScript(currentTab.id, {file: "pause_content_script.js"});
    });


}

function getSleepTimeMS() {
    debugger;
    return 5000;
}

window.addEventListener('DOMContentLoaded', function () {

    chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
          debugger;
          setup(tabs[0]);
      });


      

  });