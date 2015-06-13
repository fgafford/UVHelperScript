/*
 * This is the options contorller foo....
 * Chrome no like script tags that reference 'self'
 */


chrome.tabs.getSelected(null, function(tab) {
    port = chrome.tabs.connect(tab.id);
    port.onMessage.addListener(function(msg) {
       msg.queues.forEach(function(i){
           addOption(i);
       });
    });
    port.postMessage({"request": "queues"});
});


// func for appending checkboxs (one per queue)
function addOption(title){
    var checkbox = '<td><input type="checkbox" id="' + slim(title) + '"></input></td>';
    var labelText = '<td><label for="' + slim(title) + '">' + title + '</label></td>'
    var row = $('<tr></tr>').appendTo(table.find('tbody'));
    $(checkbox + labelText).appendTo(row);
    table.append(row);


    // go ahead and set up the on chage save listener as well...
}

function saveOptions() {
    var queues = [];
    $('input:checked').each(function(i,e){
        // now that we have slim we have to get the text from the label
        queues.push( $('label[for="' + e.id + '"]').text() );
    });

    var conf = confirm("UserVoice Helper Script Settings updated.");

    if (conf) {
        chrome.storage.local.set({"queues": queues},function(){
            window.close();
            // test and reload?
        })
    }

    // To Restore Data:
    // chrome.storage.local.get('queues',function(data){console.log(data)})
}

function restoreSettings(){
    chrome.storage.local.get('queues',function(data){
        var queues = data.queues;
        queues.forEach(function(e){
            debugger;
            $(document).find('#' + slim(e)).prop('checked',true);
        })
    })
}


window.onload = function(){
    table = $('#queues');
    $('#showOptions').click(function(){
        $('#options').toggle();
        $('#hotKeys').hide();
    });
    $('#showHotKeys').click(function(){
        $('#hotKeys').toggle();
        $('#options').hide();
    });

    $('#save').click(saveOptions);

    // because Chrome has timing issues....
    setTimeout(restoreSettings,200);
}

function slim(text) {
    return text.replace(" ","").trim();
}
