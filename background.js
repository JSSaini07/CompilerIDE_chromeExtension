compileride_url = 'http://compileride.herokuapp.com';

r = 1;

var sendLanguage=function(tab,message) {
    if(r!=-1){
        console.log('still sending');
        chrome.tabs.sendMessage(tab.id, {
            'lang': message
        });
        setTimeout(function(){sendLanguage(tab,message)},1000);
    }
}

chrome.extension.onMessage.addListener(function(message, tabinfo) {

    if (message == 'stop') {
        r = -1;
    } else {
        r=1;
        chrome.tabs.create({
            'url': compileride_url
        }, function(tab) {
            sendLanguage(tab,message);
        });
    }
});
