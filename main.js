
baseKey='Alt';
key_map=[];
key_map[baseKey]={
                  'b': 'CPP11',
                  'c': 'CPP11',
                  'o': 'CLOJURE',
                  's': 'CSHARP',
                  'a': 'JAVA',
                  'j': 'JAVASCRIPT',
                  'h': 'HASKELL',
                  'l': 'PERL',
                  'k': 'PHP',
                  'p': 'PYTHON',
                  'r': 'RUBY'
              }

language_map = {
    'CPP11': 'C++',
    'CLOJURE': 'Clojure',
    'CSHARP': 'C#',
    'JAVA': 'Java',
    'JAVASCRIPT': 'Javascript',
    'HASKELL': 'Haskell',
    'PERL': 'Perl',
    'PYTHON': 'Python',
    'RUBY': 'Ruby'
}


basePressed=-1;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    language=request.lang;
    document.execCommand('paste');
    $('#selected').attr('id', '');
    $('.languageSelected').html('<kbd>'+language_map[language]+'</kbd>');
    $('.'+language).attr('id', 'selected');
    $('.run').click();
    chrome.runtime.sendMessage('stop');
});

$(document).on('keydown',function(e){
  if(e.key==baseKey){
    basePressed*=-1;
  }
  else
  if(key_map[baseKey][e.key]!=undefined&&basePressed==1&&window.getSelection().toString()!=""){
    document.execCommand('copy');
    chrome.runtime.sendMessage(key_map[baseKey][e.key]);
  }
});

window.onblur=function(){
  basePressed=-1;
}

$(document).on('keyup',function(e){
  if(e.key==baseKey){
    basePressed*=-1;
  }
});
