/*\
|*|         === UserVoice Helper Script ===
|*|					injectScript.js 
|*| 
|*| Due to the nature of the Chrome extension being within its
|*| own scope, we have to actually insert a script tag into the DOM 
|*| and then access the JavaScript heap (where JavaScript is loaded
|*| for the page). Once the code is loaded, it will have access to any
|*| globally scoped function or variable in the page. However, the 
|*| script can no longer communicate with the extension JavaScript 
|*| or content scripts. (No more Chrome.*) 
|*| 
|*| NOTE: Any JavaScript injected in this way must be declared
|*|       as a web-accessible resource in the manifest file.
\*/

var script = 'UVscript.js';

// code to insert and run script
var s = document.createElement('script');
s.src = chrome.extension.getURL('js/' + script);
document.head.appendChild(s);

s.onload = function() {
    s.parentNode.removeChild(s);
};

