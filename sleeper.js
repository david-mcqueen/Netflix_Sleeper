window.netflixSleeper = window.netflixSleeper || {};

window.netflixSleeper.extensionControl = (function() {

    var vars = {
        currentTab: undefined
    };

    var timerControls = {
        incrementTime: function() {
            var currentTime = timerControls.getSleepTime();
            var newTime = currentTime + 1;

            if(newTime > 300) // Limited to 5 hours
                newTime = 300;

            timerControls.setSleepTime(newTime);
        },
        decrementTime: function() {
            var currentTime = timerControls.getSleepTime();
            var newTime = currentTime - 1;

            if(newTime <= 0) // Can't have negative sleep time
                newTime = 1;

            timerControls.setSleepTime(newTime);
        },
        getSleepTime: function() {
            var timerInput = document.getElementById("sleepTime");

            return parseInt(timerInput.value) || 0;
        },
        getSleepTimeMS: function() {
            var timeInMins = timerControls.getSleepTime();
            return timerControls.convertTimeToMs(timeInMins);
        },
        setSleepTime: function(time){
            var timerInput = document.getElementById("sleepTime");
            timerInput.value = time || 0;
        },
        convertTimeToMs: function(ms) {
            return ms * 60 * 1000;
        }
    }

    var controls = {
        setup: function(info) {
            vars.currentTab = info;
    
            controls.setupTimerButtons();
            controls.setupTimerControlButtons();
        },
        setupTimerControlButtons: function() {
            document.getElementById("decrementTime").addEventListener("click", timerControls.decrementTime);
            document.getElementById("incrementTime").addEventListener("click", timerControls.incrementTime);
        },
        setupTimerButtons: function() {
            // document.getElementById("playButton").addEventListener("click", controls.setupPlayDelay);
            document.getElementById("pauseButton").addEventListener("click", controls.setupPauseDelay);
        },
        setupPlayDelay: function() {
            var sleepTime = timerControls.getSleepTimeMS();
            debugger;

            chrome.tabs.executeScript(vars.currentTab.id, {
                code: 'var sleepTime = ' + sleepTime + ';'
            }, function() {
                chrome.tabs.executeScript(vars.currentTab.id, {file: "play_content_script.js"});
            });
        },
        setupPauseDelay: function() {
            var sleepTime = timerControls.getSleepTimeMS();
            debugger;

            chrome.tabs.executeScript(vars.currentTab.id, {
                code: 'var sleepTime = ' + sleepTime + ';'
            }, function() {
                chrome.tabs.executeScript(vars.currentTab.id, {file: "pause_content_script.js"});
            });
        },
        setupEventListener: function() {
            window.addEventListener('DOMContentLoaded', function () {

                if(chrome.tabs){
                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                      }, function (tabs) {
                          debugger;
                          controls.setup(tabs[0]);
                      });
                }
                else{
                    controls.setup();
                    return;
                }

            
            });
        }
    };

    controls.setupEventListener();

})();