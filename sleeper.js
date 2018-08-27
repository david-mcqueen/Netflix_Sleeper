window.netflixSleeper = window.netflixSleeper || {};

window.netflixSleeper.extensionControl = (function() {

    var vars = {
        currentTab: undefined
    };

    var controls = {
        setup: function(info) {
            vars.currentTab = info;
    
            document.getElementById("playButton").addEventListener("click", controls.setupPlayDelay);
            document.getElementById("pauseButton").addEventListener("click", controls.setupPauseDelay);
        },
        setupPlayDelay: function() {
            var sleepTime = controls.getSleepTimeMS();

            chrome.tabs.executeScript(vars.currentTab.id, {
                code: 'var sleepTime = ' + sleepTime + ';'
            }, function() {
                chrome.tabs.executeScript(vars.currentTab.id, {file: "play_content_script.js"});
            });
        },
        setupPauseDelay: function() {
            var sleepTime = controls.getSleepTimeMS();

            chrome.tabs.executeScript(vars.currentTab.id, {
                code: 'var sleepTime = ' + sleepTime + ';'
            }, function() {
                chrome.tabs.executeScript(vars.currentTab.id, {file: "pause_content_script.js"});
            });
        },
        getSleepTimeMS: function() {
            debugger;
            return 5000;
        },
        setupEventListener: function() {
            window.addEventListener('DOMContentLoaded', function () {

                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                  }, function (tabs) {
                      debugger;
                      controls.setup(tabs[0]);
                  });
            
            });
        }
    };
    debugger;

    controls.setupEventListener();

})();