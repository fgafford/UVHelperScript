/*
 * This is a work around function that allows the script access to the
 * other loaded scripts. The loss it that this script is no longer able
 * to communicate with the extension. The advantage is that it is now
 * able to manipulate all the code accessible on the page.
 */
// Need to test for locaion here and make sure that we get the right one for the
// needed scipt
var script; //name of script to inject
var UVmatch = '*.uservoice.com';

if(window.location.href.match(UVmatch)){
    script = 'UVscript.js';
    // code to insert and run script
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(script);
    document.head.appendChild(s);

    s.onload = function() {
        s.parentNode.removeChild(s);
    };
}
