/*\
|*| Something should be said here....
|*|
\*/

    var extension = '.png';

    /*
     * Icon Changer Code
     */
    function updateIcon() {
        try {
            // either use map here or something that will add all the values together
            var queues = ['Escalation','Unassigned']; // TODO : need to get this data from file


            var counts = map(queues, function(queue){
                //var badge = $('[data-custom-title-tag="' + queue + '"] .badge');
                var badge = document.querySelector('[data-custom-title-tag="' + queue + '"] .badge');
                if (badge) {
                    var text = parseInt(badge.text().trim());
                    return isNaN(text)? 0 : text;
                } else {
                    return 0;
                }
            });

            /* Dummy Test Data */
            counts = [3,4]

            /* =============== */

            // get as a single number
            var count = counts.reduce(function(runningTot, current){
                return runningTot + current
            })

            var imagePath = 'Images/';
            if (count > 10) {
                // special case -- display the warning
                imagePath += "warning" + extension;
            } else {
                // dispay the nuber in the tab
                imagePath += count + extension;
            }

            // this needs to be run within the context of the extension cannot be run out of scope of the extension
            //$('link[rel*="icon"]').prop('href', chrome.extension.getURL(imagePath));
            document.querySelector('link[rel*="icon"]').setAttribute('href',chrome.extension.getURL(imagePath))
   debugger;

        } catch (err) {
            // need to be able to catch if an invalid que is being accessed here.... maybe a map function for each of the quees in an array
            // yes... I really like the map idea.....
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

    // is this really needed in the context of a ContentScript?
    window.onload = function() {
        updateIcon();
        setInterval(updateIcon, 5000);
    };

