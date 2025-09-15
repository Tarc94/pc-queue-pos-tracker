let latestPos = null;
let lastUpdated = null;

const sendPositionUpdate = (pos) => {
    latestPos = pos;
    lastUpdated = new Date().toLocaleString();
    chrome.runtime.sendMessage(
        {
            type: "POS_BROADCAST",
            pos: latestPos,
            timestamp: lastUpdated,
        },
        () => {
            if (chrome.runtime.lastError) {
                console.debug("No popup open, ignoring error:", chrome.runtime.lastError.message); 
            }
        }
    );
};

chrome.webRequest.onCompleted.addListener(
    async (details) => {
        if (details.url.includes("/_Incapsula_Resource")) {
            try {
                const resp = await fetch(details.url, { credentials: "include" });

                if (resp.ok) {
                    const data = await resp.json();

                    if (data && typeof data.pos === "number") { 
                        sendPositionUpdate(data.pos);
                    } else {
                        console.warn("Unexpected data format:", data);
                    }
                } else {
                    console.warn("Failed to fetch POS, status:", resp.status);
                }
            } catch (err) {
                console.error("Error fetching POS:", err); 
            }
        } else {
            // No queue active, so you are in
            sendPositionUpdate(0);
        }
    },
    { urls: ["*://www.pokemoncenter.com/*"] }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message && message.type === "GET_POS") { 
        sendResponse({ pos: latestPos, timestamp: lastUpdated });
    } else {
        console.warn("Received unknown message type:", message);
    }   
});