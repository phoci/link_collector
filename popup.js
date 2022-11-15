document.getElementById("buttonCopyList").onclick = function () {
    chrome.runtime.sendMessage({
        contentScriptQuery: "msgCopyList"
    });
}

document.getElementById("buttonClearList").onclick = function () {
    chrome.runtime.sendMessage({
        contentScriptQuery: "msgClearList"
    });
}
