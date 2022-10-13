links = new Map();

chrome.contextMenus.create({
    id: "addToLinksList",
    title: "Add to links list",
    contexts: ["selection"],
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    addToLinksList(info.selectionText, tab)
}
)

chrome.commands.onCommand.addListener((command) => {
    if (command == "copy-to-clipboard") {
        console.log(`Command "${command}" triggered`);
        textToCopy = ""
        for (let [k, v] of links) {
            console.log(v + " " + k + "\n");
            textToCopy = textToCopy + (v + " " + k + "\n");
        }
        //
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id,
                {
                    message: "copyText",
                    textToCopy: textToCopy
                }, function (response) { })
        })
    }
})

function addToLinksList(text, tab) {
    console.log(text + " " + tab.url + "\n");
    links.set(tab.url, text)
    console.log(links)
}