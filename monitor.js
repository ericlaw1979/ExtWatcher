"use strict";

function refreshLog() {
    chrome.storage.local.get(null, function(info) {
        let sLog = info["sLog"] || "";
        document.getElementById("txtLog").textContent = sLog;
    });
}

function doClearLog() {
    chrome.storage.local.set({"sLog":(new Date().toISOString() + ': (cleared)')}, null);
    refreshLog();
}

// TODO: Autorefresh?
document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const sOp = urlParams.get("op");
    if (!sOp || (sOp === "ShowLog")) {
        document.getElementById("txtEvent").textContent = "The following is the log of Extension-related events previously seen.";
    }
    else {
        document.getElementById("txtEvent").textContent = new Date() + " - extWatcher opened this page because we saw an |Extension." + sOp + "| event for the |" +
            (urlParams.get("name")||"?") + " " + urlParams.get("id") + "| extension.";
    }

    refreshLog();

    document.getElementById('btnClear').addEventListener('click', doClearLog);

}, false);
