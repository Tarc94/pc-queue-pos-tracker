const posEl = document.getElementById("pos");
const tsEl = document.getElementById("timestamp");

function sanitizeInput(input) {
    return String(input).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function updatePos(value, timestamp) {
    const sanitizedValue = value !== null ? sanitizeInput(value) : "No data yet";
    const sanitizedTimestamp = timestamp !== null
        ? sanitizeInput(timestamp)
        : new Date().toLocaleString();

    posEl.textContent = sanitizedValue <= 0 ? 0 : sanitizedValue;
    tsEl.textContent = `Last update: ${sanitizedTimestamp}`;
}


chrome.runtime.sendMessage({ type: "GET_POS" }, (response) => {
    if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError);
        return;
    }

    if (response) {
        updatePos(response.pos, response.timestamp);
    }
});


chrome.runtime.onMessage.addListener((message, sender) => {
    if (sender.id !== chrome.runtime.id) {
        console.warn("Untrusted message source");
        return;
    }

    if (message.type === "POS_BROADCAST") {
        updatePos(message.pos, message.timestamp);
    }
});