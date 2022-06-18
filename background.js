"use strict"

// Background page
// https://developer.chrome.com/extensions/event_pages

chrome.management.onInstalled.addListener((e)=> { onExtInstall(e); });
chrome.management.onUninstalled.addListener((e)=> {onExtUninstall(e); });
chrome.management.onEnabled.addListener((e)=> {onExtEnable(e); });
chrome.management.onDisabled.addListener((e)=> {onExtDisable(e); });

// Record an Event in the log.
function logEvent(sEvent) {
    chrome.storage.local.get(null, function(info) {
        let sLog = info["sLog"] || "";
        sLog = new Date().toISOString() + "- " + sEvent + "\n" + info["sLog"];
        chrome.storage.local.set({"sLog":sLog}, null);
    });  
}

function onExtInstall(e) {
    logEvent(`Installed id=${e.id},name=${e.shortName},reason=${e.installType}.`);
    //chrome.tabs.create({ url: "/monitor.html?op=Install&name=" + e.shortName + "&id=" + e.id });
}
function onExtUninstall(id) {
    logEvent(`Uninstalled id=${id}.`);
    chrome.tabs.create({ url: "/monitor.html?op=Uninstall&id=" + id });
}
function onExtEnable(e) {
    logEvent(`Enabled id=${e.id},name=${e.shortName}.`);
    //chrome.tabs.create({ url: "/monitor.html?op=Enable&name=" + e.shortName + "&id=" + e.id });
}
function onExtDisable(e) {
    logEvent(`Disabled id=${e.id},name=${e.shortName},reason=${e.disabledReason}.`);
    //chrome.tabs.create({ url: "/monitor.html?op=Disable&name=" + e.shortName + "&id=" + e.id + "&reason=" + e.disabledReason });
}
// chrome.browserAction.setBadgeText( {text: "dev"} );

chrome.browserAction.onClicked.addListener (
    (t)=>{
      chrome.tabs.create({ url: "/monitor.html?op=ShowLog" });
    }
);

  