/**
 * This file applies Jquery animations that will hide and display what we did in Activity 6.
 * This cannot be done with the js knowledge we learnt so far.
 */

$(document).ready(function(){
    //Initially hide the container holding the contributors table and buttons.
    $("#contributors-container").hide();

    //Toggle fadeIn/fadeOut when the panel is clicked.
    $("#contributors-panel").click(function(){
        if ($("#contributors-container").is(":visible")) {
            $("#contributors-container").fadeOut("slow");
        } else {
            $("#contributors-container").fadeIn("slow");
        }
    });
});