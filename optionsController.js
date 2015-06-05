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
    var checkbox = '<td><input type="checkbox" id="' + title + '"></input></td>';
    var labelText = '<td><label for="' + title + '">' + title + '</label></td>'
    var row = $('<tr></tr>').appendTo(table.find('tbody'));
    $(checkbox + labelText).appendTo(row);
    table.append(row);

    
    // go ahead and set up the on chage save listener as well...
}

function saveOptions() {
    var queues = []; 
    $('input:checked').each(function(i,e){
        queues.push(e.id);
    });

    chrome.storage.local.set({"queues": queues},function(){ 
        confirm("UserVoice Helper Script Settings updated.");
        // test and reload?
    })
    
    // To Restore Data:
    // chrome.storage.sync.get('queues',function(data){console.log(data)})
}

window.onload = function(){
    table = $('#queues');
    $('#showOptions').click(function(){
        $('#options').toggle();
    });
    $('#showHotKeys').click(function(){
        $('#hotKeys').toggle();
    });

    $('#save').click(saveOptions);

    // TODO: restore previously saved values
}


