/**
 * Script designed to help with tasts in UserVoice Helpdesk software
 */
//(function() {

// Globals
    var alt = false;
    var UVrootURL = window.location.host + "/admin";

    // end function for catching end of keystroke
    function keyup(e) {
        if (e.keyCode == 18) {
            alt = false;
        }
    }

    // function for catching key stokes
    function keydown(e) {
        var key = e.keyCode;
        if (e.keyCode == 18) {
            alt = true;
        }
        if (alt) {
            switch (key) {
                case 65: // A
                        // hide all
                        $('.ticket-reply-content').hide();
                        // make sure the reply to sticks around
                        $($('.ticket-reply-content')[0]).show();
                        enableMessageFolding(); 
                        break;
                case 90: //Z
                        // show all
                        $('.ticket-reply-content').show();
                        enableMessageFolding(); 
                        break;
                case 88: // X
                    // update();
                    break;
                case 89: // Y
                    toggleFlag();
                    break;
                case 67: // C
                    // updateAndClose();
                    break;
                case 86: // V
                    // function here that adds close message
                    getResponse(closed);
                    // updateAndClose();
                    break;
                case 84: // T
                    focusOnTicket();
                    addTargetWrapper();
                    break;
                case 83: // S
                    var elem = document.getElementById(subjectField);
                    var sub = prompt('Subject Text: ', elem.value);
                    elem.value = sub;
                    break;
                case 78: // N
                    focusOnNote();
                    break;
                case 77: // M  - change name of user
                    focusOnMessage();
                    break;
                case 81: // Q
                    // snap to personal tickets
                    window.location = UVrootURL + '/tickets/?q=assignee%3Ame+status%3Aopen';
                    break;
                case 73: // I
                    // snap to inbox
                    window.location = UVrootURL + '/tickets/?q=assignee%3A"none"+status%3Aopen';
                    break;
                case 82: // R
                    // snapps user to the most recent update
                    location = "#request_history_box_wrap_box_body";
                    break;
            }
        }
    }
    /*
     * Icon Changer Code
     */
    function updateIcon() {
        try {

            var extension = '.png';

            // either use map here or something that will add all the values together
            var queues = ['Escalation','Unassigned']; // TODO : need to get this data from file


            var counts = map(queues, function(queue){
                var text = parseInt($('[data-custom-title-tag="' + queue + '"] .badge').text().trim());
                return isNaN(text)? 0 : text;
            });

            /* Dummy Test Data */
            counts = [3,4]

            /* =============== */

            // get as a single number
            var count = counts.reduce(function(runningTot, current){
                return runningTot + current
            })

            var imagePath;
            if (count > 10) {
                // special case -- display the warning
                imagePath = "warning" + extension;
            } else {
                // dispay the nuber in the tab
                imagePath = count + extension;
            }

            // this needs to be run within the context of the extension cannot be run out of scope of the extension
            $('link[rel*="icon"]').prop('href', chrome.extension.getURL(imagePath));

        } catch (err) {
            // need to be able to catch if an invalid que is being accessed here.... maybe a map function for each of the quees in an array
            // yes... I really like the map idea.....
        }
    }

    function toggleFlag() {
        // not yet implemented
    }

    function update() {
        $('.ticket-submit-open').click();
    }

    function focusOnTicket() {
        $('.ticket-content').click();
        highlightSubject();
    }

    function focusOnMessage() {
        $('.ticket-reply-tab-message > a').click();
    }

    function focusOnNote() {
        $('.ticket-reply-tab-note > a').click();
    }
    
    function highlightSubject() {
        $('.ticket-item-subject').css('background-color','yellow');
    }

    function addTargetWrapper() {
        // wrap anchor around all search results so they can be targeted by Vimium
        try {
            // removed due to Scope:   onclick="javascript:focusOnTicket();"
            $('.ticket-item-title').wrap('<a href="#"></a>');
        } catch (err) {
            console.log(err);
        }
    }

    // enable click on email name to show or hide response details
    function enableMessageFolding() {
        var pics = $('.ticket-reply-avatar')
        // check to see if the event is already on the elements. 
        if( pics.length && !$(pics[0]).data('events')){
            pics.click(function(i,e){
                $(this).parent().parent().find('.ticket-reply-content').toggle();
            });    
        };
    };

    // =====================================================================

    // Event listenets to get everything working...
    document.body.addEventListener('keydown', keydown);
    document.body.addEventListener('keyup', keyup);
    window.addEventListener("hashchange", addTargetWrapper, false);
    window.addEventListener("hashchange", focusOnTicket, false);

    addTargetWrapper();

    window.onload = function() {
        focusOnTicket();

        $('.ticket-item-title').focus(addTargetWrapper);
        updateIcon();
        setInterval(updateIcon, 5000);
        
        highlightSubject();
        enableMessageFolding();
    };

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


//})();
