window.netflixSleeper = window.netflixSleeper || {};
function click() {

    debugger;
    var playElements = document.getElementsByClassName('svg-icon-nfplayerPlay');

    if(playElements != null && playElements.length >= 1 && !window.netflixSleeper.existingTimer){

        window.netflixSleeper.existingTimer = setTimeout(function() {

            window.netflixSleeper.existingTimer = null;
            playElements[0].parentElement.click()

        }, sleepTime);

    }

}

click();