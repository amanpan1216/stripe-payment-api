// Background Patch for Card Retrieval Fix
console.log("Background Card Patch Loaded.");

// Intercept messages requesting card list
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Background received message:", request);
    
    // Handle card list requests
    if (request.type === "getCardList" || request.action === "getCardList") {
        chrome.storage.local.get("savedCards", (result) => {
            if (result.savedCards && result.savedCards.length > 0) {
                console.log("Sending cards from background:", result.savedCards.length, "cards");
                sendResponse({ success: true, cards: result.savedCards });
            } else {
                console.log("No cards found in storage");
                sendResponse({ success: false, cards: [], message: "No cards found" });
            }
        });
        return true; // Indicates that the response is sent asynchronously
    }
    
    // Handle card save requests from content scripts
    if (request.type === "saveCards" || request.action === "saveCards") {
        if (request.cards && Array.isArray(request.cards)) {
            chrome.storage.local.set({ savedCards: request.cards }, () => {
                console.log("Cards saved from background:", request.cards.length, "cards");
                sendResponse({ success: true, message: "Cards saved successfully" });
            });
            return true;
        }
    }
    
    // Handle storage check requests
    if (request.type === "checkCards" || request.action === "checkCards") {
        chrome.storage.local.get("savedCards", (result) => {
            const count = result.savedCards ? result.savedCards.length : 0;
            console.log("Card count check:", count);
            sendResponse({ success: true, count: count, hasCards: count > 0 });
        });
        return true;
    }
});

// Also intercept storage.local.get calls and redirect to savedCards
const originalGet = chrome.storage.local.get;
chrome.storage.local.get = function(keys, callback) {
    // If requesting any card-related key, also check savedCards
    if (typeof keys === 'string' || (Array.isArray(keys) && keys.some(k => k.includes('card') || k.includes('Card')))) {
        console.log("Intercepted storage.local.get for:", keys);
        
        // Get both the original keys and savedCards
        const keysToGet = Array.isArray(keys) ? [...keys, "savedCards"] : [keys, "savedCards"];
        
        originalGet.call(chrome.storage.local, keysToGet, (result) => {
            // If savedCards exists and original keys don't have data, use savedCards
            if (result.savedCards && result.savedCards.length > 0) {
                console.log("Redirecting to savedCards:", result.savedCards.length, "cards");
                
                // Map savedCards to all requested keys
                if (Array.isArray(keys)) {
                    keys.forEach(key => {
                        if (!result[key] || (Array.isArray(result[key]) && result[key].length === 0)) {
                            result[key] = result.savedCards;
                        }
                    });
                } else if (typeof keys === 'string') {
                    if (!result[keys] || (Array.isArray(result[keys]) && result[keys].length === 0)) {
                        result[keys] = result.savedCards;
                    }
                }
            }
            
            if (callback) callback(result);
        });
    } else {
        // Normal get operation
        originalGet.call(chrome.storage.local, keys, callback);
    }
};

console.log("Background patch: Storage interception active");
