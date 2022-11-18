/*
document.getElementById("buttonCopyList").onclick = function () {
    console.log("Copy list btton pressed.")
    chrome.runtime.sendMessage({
        contentScriptQuery: "msgCopyList"
    }, function (response) {
        console.log(response);
    });
}

document.getElementById("buttonClearList").onclick = function () {
    chrome.runtime.sendMessage({
        contentScriptQuery: "msgClearList"
    }, function (response) {
        console.log(response);
    });
}
*/

function copyList() {
    console.log("Copy list btton pressed.")
    chrome.runtime.sendMessage({
        contentScriptQuery: "msgCopyList"
    }, function (response) {
        console.log(response);
    });
}

function clearList() {
    chrome.runtime.sendMessage({
        contentScriptQuery: "msgClearList"
    }, function (response) {
        console.log(response);
    });
}

(function(){
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelector('#copyList').addEventListener(
          'click', copyList);
      document.querySelector('#clearList').addEventListener(
          'click', clearList);
    });
  })();