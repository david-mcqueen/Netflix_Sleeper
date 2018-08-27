window.netflixSleeper = window.netflixSleeper || {};
window.netflixSleeper.playScript = (function() {

    var vars = {
        existingTimer: undefined
    };

    var controls = {
        click: function() {
            debugger;
            var playElements = document.getElementsByClassName('svg-icon-nfplayerPlay');

            if(playElements != null && playElements.length >= 1 && !vars.existingTimer){

                vars.existingTimer = setTimeout(function() {

                    clearTimeout(vars.existingTimer);
                    vars.existingTimer = null;
                    playElements[0].parentElement.click()

                }, sleepTime);

            }
        }
    };

    controls.click();

})();