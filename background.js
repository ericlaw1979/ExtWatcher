"use strict"

// Background page
// https://developer.chrome.com/extensions/event_pages

chrome.management.onInstalled.addListener((e)=> { onExtInstall(e); });
chrome.management.onUninstalled.addListener((e)=> {onExtUninstall(e); });
chrome.management.onEnabled.addListener((e)=> {onExtEnable(e); });
chrome.management.onDisabled.addListener((e)=> {onExtDisable(e); });


function onExtInstall(e) {
    chrome.tabs.create({ url: "/monitor.html?op=Install&name=" + e.shortName + "&id=" + e.id });
}
function onExtUninstall(id) {
    chrome.tabs.create({ url: "/monitor.html?op=Uninstall&id=" + id });
}
function onExtEnable(e) {
    chrome.tabs.create({ url: "/monitor.html?op=Enable&name=" + e.shortName + "&id=" + e.id });
}
function onExtDisable(e) {
    chrome.tabs.create({ url: "/monitor.html?op=Disable&name=" + e.shortName + "&id=" + e.id + "&reason=" + e.disabledReason });
}
// chrome.browserAction.setBadgeText( {text: "dev"} );

chrome.browserAction.onClicked.addListener (
    (t)=>{
      chrome.tabs.create({ url: "/monitor.html?op=ShowLog" });
    }
);

  