links = new Map();

chrome.contextMenus.create({
    id: "addToLinksList",
    title: "Add to links",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    addToLinksList(info.selectionText, tab)
}
)

chrome.commands.onCommand.addListener((command, tab) => {
    console.log(`Command "${command}" triggered`);
    /*
    if (`${command}` == "add-link") {
        console.log(`Command "aaa" triggered`);
    }
    */
    addToLinksList(chrome.document.getElementById("output").value, tab)
});

function addToLinksList(text, tab) {
    console.log(text + " " + tab.url + "\n");
    //links.push({"url": tab.url, "text": info.selectionText})
    links.set(tab.url, text)
    console.log(links)
}