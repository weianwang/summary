/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

 // HTTP + GET request to Article API
var xmlHttp = null;

function getArticleText(){
	//I still don't quite understand callback functions
	var url = getCurrentTabUrl(function(url));
	var host = 'http://api.diffbot.com/v3/article?' + 'token=2bc180cbefa2ca3d7e384d6b98971bb0&url=' + url
    + '&field=text';
    xmlHttp = new XMLHttpRequest();
    // I cannot for the life of me figure out what this does but it apprently has to do with asynchronous things.
    xmlHttp.onreadystatechange = function(){
    	if (xmlHttp.readySTate == 4 && xmlHttp.status == 200)
    		callback(xmlHttp.responseText);
    }
    xmlHttp.open ( "GET", host, true);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}


function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}
