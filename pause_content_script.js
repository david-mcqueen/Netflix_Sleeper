window.netflixSleeper = window.netflixSleeper || {};
window.netflixSleeper.pauseScript = (function() {

    var vars = {
        existingTimer: undefined
    };

    var controls = {
        click: function() {
            debugger;
            var pauseElements = document.getElementsByClassName('svg-icon-nfplayerPause');

            if(pauseElements != null && pauseElements.length >= 1 && !vars.existingTimer){
                
                vars.existingTimer = setTimeout(function() {

                    clearTimeout(vars.existingTimer);
                    vars.existingTimer = null;
                    pauseElements[0].parentElement.click()

                }, sleepTime);

            }
        }
    }

    controls.click();

})()