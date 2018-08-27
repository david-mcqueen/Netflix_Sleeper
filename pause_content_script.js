window.netflixSleeper = window.netflixSleeper || {};

function click() {

    debugger;
    var pauseElements = document.getElementsByClassName('svg-icon-nfplayerPause');

    if(pauseElements != null && pauseElements.length >= 1 && !window.netflixSleeper.existingTimer){
        
        window.netflixSleeper.existingTimer = setTimeout(function() {

            window.netflixSleeper.existingTimer = null;
            pauseElements[0].parentElement.click()

        }, sleepTime);

    }

}

click();