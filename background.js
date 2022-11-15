links = new Map();

chrome.contextMenus.create({
    id: "addToLinksList",
    title: "Add to links list",
    contexts: ["selection"],
})

function addToLinksList(text, tab) {
    console.log(text + " " + tab.url + "\n");
    links.set(tab.url, text)
    console.log(links)
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    addToLinksList(info.selectionText, tab)
}
)

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function injectedFunction_egrave(textToCopy) {
    let input = document.createElement('textarea');
    input.value = textToCopy;
    input.setAttribute('readonly', '');
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
}

chrome.commands.onCommand.addListener((command) => {
    if (command == "copy-to-clipboard") {
        console.log(`Command "${command}" triggered`);
        textToCopy = ""
        for (let [k, v] of links) {
            console.log(v + " " + k + "\n");
            textToCopy = textToCopy + (v + " " + k + "\n");
        }
        getCurrentTab().then(function (tab) {
            console.log("hello");
            console.log(tab);
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: injectedFunction_egrave,
                args: [textToCopy]
            });
        });
    }
}
)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.contentScriptQuery) {
        case "msgCopyList":
            textToCopy = ""
            for (let [k, v] of links) {
                console.log(v + " " + k + "\n");
                textToCopy = textToCopy + (v + " " + k + "\n");
            }
            getCurrentTab().then(function (tab) {
                console.log("hello");
                console.log(tab);
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: injectedFunction_egrave,
                    args: [textToCopy]
                });
            });
            break;
        case "msgClearList":
            links.clear();
    }
    return true;
});
