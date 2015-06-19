/*\
|*| 		=== UserVoice Helper Script ===
|*| 				 UVScript.js
|*| 
|*| This script is injected into the DOM and loses all
|*| communication with the backgound extension processes. 
|*| (for more information see header comment in injectScript.js)
|*| 
|*| Code in this file should either be properly namespaced
|*| or inside of a self-executing anonymous function to 
|*| prevent overwriting properties in the JavaScript heap.
|*| 
|*| Note that all extension resources used in this scope 
|*| (regular page scope) must be marked as web-accessible
|*| resources in the manifest file.
|*| 
\*/


	// set Namespace
    var UVHS = {
        alt : false,
        UVrootURL : window.location.host + "/admin"
    }

    // function for catching end of key stroke
    function keyup(e) {
        if (e.keyCode == 18) {
            UVHS.alt = false;
        }
    }

    // function for catching key strokes
    function keydown(e) {
        var key = e.keyCode;
        if (e.keyCode == 18) {
            UVHS.alt = true;
        }
        if (UVHS.alt) {
            switch (key) {
                case 65: // A
                    // hide all
                    $('.ticket-reply-content').hide();
                    // make sure the "reply to" sticks around
                    $($('.ticket-reply-content')[0]).show();
                    break;
                case 90: //Z
                    // show all
                    $('.ticket-reply-content').show();
                    break;
                case 88: // X
                	// real easy to fire off a message by accident with this guy....
                    // update();
                    break;
                case 84: // T
                	// great if you use Vimium to navigate the page
                    focusOnTicket();
                    addTargetWrapper();
                    break;
                case 78: // N
                    focusOnNote();
                    break;
                case 77: // M 
                    focusOnMessage();
                    break;
                case 81: // Q
                    // snap to personal tickets
                    window.location.href = '//' + UVHS.UVrootURL + '/tickets/?q=assignee%3Ame+status%3Aopen';
                    break;
                case 73: // I
                    // snap to inbox
                    window.location = '//' +  UVHS.UVrootURL + '/tickets/?q=assignee%3A"none"+status%3Aopen';
                    break;
                case 82: // R
                    // snap user to the most recent update
                    location = "#request_history_box_wrap_box_body";
                    break;
            }
        }
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

	// Wrap anchor (<a>) around all search results so they can be targeted by Vimium 
    function addTargetWrapper() {
        try {
            $('.ticket-item-title').wrap('<a href="#"></a>');
        } catch (err) {
            console.log(err);
        }
    }

    // enable "click on avatar" to show or hide response details
    function enableMessageFolding() {
        var pics = $('.ticket-reply-avatar')
        // check to see if the event listener is already registered on the element.
        if( pics.length && !$(pics[0]).data('events')){
            pics.click(function(i,e){
                $(this).parent().parent().find('.ticket-reply-content').toggle();
            });
        };
    };


    // =====================================================================


    // Event listeners to get everything working...
    document.body.addEventListener('keydown', keydown);
    document.body.addEventListener('keyup', keyup);
    window.addEventListener("hashchange", addTargetWrapper, false);
    window.addEventListener("hashchange", focusOnTicket, false);

    addTargetWrapper();

    window.onload = function() {
        focusOnTicket();

        $('.ticket-item-title').focus(addTargetWrapper);

        highlightSubject();

        enableMessageFolding();

        /*\
        |*| Because messages are loaded over ajax we have to keep checking
        |*| back to make sure all messages are updated with the listeners.
        |*| EnableMessageFolding will only set listeners once for the
        |*| icons.
        \*/
        setInterval(enableMessageFolding,2500);
    };
