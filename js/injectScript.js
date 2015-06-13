/*
 * This is a work around function that allows the script access to the
 * other loaded scripts. The loss it that this script is no longer able
 * to communicate with the extension. The advantage is that it is now
 * able to manipulate all the code accessible on the page.
 */

var script = 'UVscript.js';

// code to insert and run script
var s = document.createElement('script');
s.src = chrome.extension.getURL('js/' + script);
document.head.appendChild(s);

s.onload = function() {
    s.parentNode.removeChild(s);
};

