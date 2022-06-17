"use strict";

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

    const storage = chrome.storage.local;
    storage.get(null, function(info) {
        let sLog = info["sLog"] || "";
        document.getElementById("txtLog").textContent = sLog;

        sLog = document.getElementById("txtEvent").textContent + "\n" + info["sLog"];
        if (sOp && sOp != "ShowLog") storage.set({"sLog":sLog}, null);
    });

}, false);
