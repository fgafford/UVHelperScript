/*\
|*|			=== UserVoice Helper Script === 
|*| 			 UVcontentScript.js
|*| 
|*| Here we need to pass DOM data back to the optionsController.
|*|  
|*| Icons have to be web-accessible resources as we are 
|*| using them to manipulate the DOM for the page. 
|*| 
\*/

    var extension = '.png';

    // message passing to get the queues we are dealing with
    chrome.runtime.onConnect.addListener(function(port) {
        port.onMessage.addListener(function(msg) {
           port.postMessage( { "queues": getQueues() });
        });
    });

    function getQueues() {
        var queues = []
        $('#nav-tickets [data-model="ticket-stream"] .name').each(function(i,e){
           // need a way to keep out the 'My Searches' queues that do not keep number badges
            if ($(e).parents('#ticket-streams-saved').length) {
               // do nothing here....
            } else {
                queues.push($(e).first().text());
            }
        });

        return queues;
    }


    /*
     * Icon Changer Code
     */
    function updateIcon() {
        try {
        	// reload the saved options here
            chrome.storage.local.get('queues',function(data){
                queues = data.queues;
            })


            var counts = map(queues, function(queue){
                var badge = document.querySelector('[data-custom-title-tag="' + queue + '"] .badge');
                if (badge) {
                    var text = parseInt(badge.textContent.trim());
                    return isNaN(text)? 0 : text;
                } else {
                    return 0;
                }
            });

            // get as a single number
            var count = counts.reduce(function(runningTot, current){
                return runningTot + current
            })

            var imagePath = 'img/';
            if (count > 10) {
                // high count -- display the warning
                imagePath += "warning" + extension;
            } else {
                // display the number in the tab
                imagePath += count + extension;
            }


            document.querySelector('link[rel*="icon"]').setAttribute('href',chrome.extension.getURL(imagePath))

        } catch (err) {
            // TODO: warn user that the queues read failed
            // suggest that they update their options
        }
    }

    // Helper func
    function map(enumerable, callback){
        if(!enumerable){
            return null;
        }
        var result = [];
        if(enumerable instanceof Array){
            for(var i = 0, l = enumerable.length; i < l; i++){
                result.push(callback(enumerable[i], i));
            }
        }else if(typeof enumerable === 'object'){
            for(var key in enumerable){
                if(typeof key === 'undefined'){
                    continue;
                }
                result.push(callback(enumerable[key], key));
            }
        }else{
            return null;
        }
        return result;
    }

    window.onload = function() {
        updateIcon();
        setInterval(updateIcon, 2500);
    };

