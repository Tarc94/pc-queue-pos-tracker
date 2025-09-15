let latestPos = null;
let lastUpdated = null;

// Listen for completed requests to the target endpoint
chrome.webRequest.onCompleted.addListener(
  async (details) => {
    console.log("Raw Request:", details.url);
    if (details.url.includes("/_Incapsula_Resource")) {
      try {
        // Fetch the response body ourselves
        const resp = await fetch(details.url, { credentials: "include" });
        console.log("Background fetch status:", resp.status);
        const data = await resp.json();
        console.log("Response body:", data);

        if (data.pos !== undefined) {
          latestPos = data.pos;
          lastUpdated = new Date().toLocaleString();
          console.log("Position updated:", latestPos);

          // Notify popup if open
          chrome.runtime.sendMessage(
            {
              type: "POS_BROADCAST",
              pos: latestPos,
              timestamp: lastUpdated
            },
            () => {
              if (chrome.runtime.lastError) {
                // No popup open, safe to ignore
              }
            }
          );
        }
      } catch (err) {
        console.warn("Error fetching POS:", err);
      }
    }
    else {
      // There is no queue active, so you are in
      latestPos = 0;
      lastUpdated = new Date().toLocaleString();
      // Notify popup if open
          chrome.runtime.sendMessage({
            type: "POS_BROADCAST",
            pos: latestPos,
            timestamp: lastUpdated
          });
    }
  },
  { urls: ["*://www.pokemoncenter.com/*"] }
);

// Allow popup to query latest POS
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_POS") {
    sendResponse({ pos: latestPos, timestamp: lastUpdated });
  }
});
