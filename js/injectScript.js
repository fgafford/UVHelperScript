/*\
|*|         === UserVoice Helper Script ===
|*|					injectScript.js 
|*| 
|*| Due to the nature of Chrome extension being within their
|*| own scope, in order to access the JavaScript heap (where
|*| JavaScript is loaded for the page) we have to actually 
|*| insert a file into the DOM and then load it from there. 
|*| Once the code is loaded it will have access to any gloabaly
|*| scoped functions in the page. (Very helpful)
|*| 
|*| However, the script can no longer communicate with the 
|*| background JavaScript or content scripts. (No more Chrome.*) 
|*| 
|*| NOTE: any JavaScript injected in this way must be declaried
|*|       as a web-accessable resource in the manifest file.
\*/

var script = 'UVscript.js';

// code to insert and run script
var s = document.createElement('script');
s.src = chrome.extension.getURL('js/' + script);
document.head.appendChild(s);

s.onload = function() {
    s.parentNode.removeChild(s);
};

