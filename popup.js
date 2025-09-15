const posEl = document.getElementById("pos");
const tsEl = document.getElementById("timestamp");

function updatePos(value, timestamp) {
  posEl.textContent = value !== null ? value : "No data yet";
  tsEl.textContent = timestamp !== null
    ? `Last update: ${timestamp}`
    : "Last update: —";
}

// Fetch latest when popup opens
chrome.runtime.sendMessage({ type: "GET_POS" }, (response) => {
  if (response) {
    updatePos(response.pos, response.timestamp);
  }
});

// Listen for live updates
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "POS_BROADCAST") {
    updatePos(message.pos, message.timestamp);
  }
});
