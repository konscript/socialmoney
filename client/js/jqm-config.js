$(document).bind("mobileinit", function () {
    console.log('mobileinit succesful');
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    // $.mobile.pageContainer = "div#main";
});